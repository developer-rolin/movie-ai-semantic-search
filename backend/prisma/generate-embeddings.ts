import { pipeline, type Tensor } from "@xenova/transformers";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  console.log("⚡ Carregando o modelo de IA (Xenova/all-MiniLM-L6-v2)...");
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
  );

  console.log("🔍 Buscando filmes no banco de dados...");
  const movies = await prisma.movie.findMany({
    select: {
      id: true,
      title: true,
      overview: true,
      keywords: true,
    },
  });

  console.log(
    `🚀 Iniciando geração de embeddings para ${movies.length} filmes...`,
  );

  for (const [index, movie] of movies.entries()) {
    // Texto combinado para representar o filme semanticamente
    const textToEmbed = `${movie.title}. ${movie.overview} ${movie.keywords.join(" ")}`;

    const output = (await extractor(textToEmbed, {
      pooling: "mean",
      normalize: true,
    } as any)) as Tensor;

    const embeddingArray = Array.from(output.data) as number[];
    const vectorString = `[${embeddingArray.join(",")}]`;

    // Atualiza a coluna embedding via SQL bruto
    await prisma.$executeRawUnsafe(
      `UPDATE movies SET embedding = '${vectorString}'::vector WHERE id = ${movie.id};`,
    );

    const currentCount = index + 1;
    if (currentCount % 100 === 0 || currentCount === movies.length) {
      console.log(`✓ [${currentCount}/${movies.length}] Filmes processados.`);
    }
  }

  console.log("✨ Embeddings atualizados com sucesso no PostgreSQL!");
}

main()
  .catch((e) => {
    console.error("Erro ao gerar embeddings:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
