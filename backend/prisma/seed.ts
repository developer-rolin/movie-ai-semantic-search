import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import csvParser from "csv-parser";
import { prisma } from "../src/lib/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Interfaces para tipar os dados brutos dos CSVs
interface CsvMovieRow {
  id: string;
  title: string;
  overview: string;
  tagline: string;
  genres: string;
  keywords: string;
  release_date: string;
  vote_average: string;
  vote_count: string;
  popularity: string;
  budget: string;
  revenue: string;
}

interface CsvCreditRow {
  movie_id: string;
  title: string;
  cast: string;
  crew: string;
}

// Helper para parsear JSONs malformados ou vazios do CSV com segurança
function safeJsonParse(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return [];
  }
}

// Função para ler arquivos CSV como Stream e retornar um array de objetos
function readCsv<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

async function main() {
  console.log("🚀 Iniciando ingestão dos dados dos filmes...");

  const moviesPath = path.resolve(
    __dirname,
    "../../database_filmes/tmdb_5000_movies.csv",
  );
  const creditsPath = path.resolve(
    __dirname,
    "../../database_filmes/tmdb_5000_credits.csv",
  );

  console.log("📖 Lendo os arquivos CSV...");
  const rawMovies = await readCsv<CsvMovieRow>(moviesPath);
  const rawCredits = await readCsv<CsvCreditRow>(creditsPath);

  // Mapear os créditos por movie_id para busca rápida em O(1)
  const creditsMap = new Map<
    number,
    { cast: string[]; director: string | null }
  >();

  for (const credit of rawCredits) {
    const movieId = Number.parseInt(credit.movie_id, 10);
    if (Number.isNaN(movieId)) continue;

    const castList = safeJsonParse(credit.cast);
    const crewList = safeJsonParse(credit.crew);

    const topCast = Array.isArray(castList)
      ? castList
          .slice(0, 5)
          .map((actor: { name: string }) => actor.name)
          .filter(Boolean)
      : [];

    const directorObj = Array.isArray(crewList)
      ? crewList.find(
          (member: { job: string; name: string }) => member.job === "Director",
        )
      : null;

    creditsMap.set(movieId, {
      cast: topCast,
      director: directorObj ? directorObj.name : null,
    });
  }

  console.log(
    `🎬 Processando e inserindo ${rawMovies.length} filmes no banco...`,
  );

  // Limpar registros anteriores no banco se houver
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "movies" RESTART IDENTITY CASCADE;',
  );

  let insertedCount = 0;

  for (const row of rawMovies) {
    const tmdbId = Number.parseInt(row.id, 10);
    if (Number.isNaN(tmdbId)) continue;

    const genresList = safeJsonParse(row.genres);
    const keywordsList = safeJsonParse(row.keywords);

    const genres = Array.isArray(genresList)
      ? genresList.map((g: { name: string }) => g.name)
      : [];
    const keywords = Array.isArray(keywordsList)
      ? keywordsList.map((k: { name: string }) => k.name)
      : [];

    const credits = creditsMap.get(tmdbId) || { cast: [], director: null };

    const releaseYear = row.release_date
      ? Number.parseInt(row.release_date.split("-")[0], 10)
      : null;

    // Inserção limpa (os embeddings serão gerados depois pelo script dedicado)
    await prisma.$executeRaw`
      INSERT INTO "movies" (
        "tmdbId", "title", "overview", "tagline", "genres", "keywords",
        "cast", "director", "releaseYear", "voteAverage", "voteCount",
        "popularity", "budget", "revenue", "createdAt"
      ) VALUES (
        ${tmdbId},
        ${row.title},
        ${row.overview || ""},
        ${row.tagline || null},
        ${genres},
        ${keywords},
        ${credits.cast},
        ${credits.director || null},
        ${releaseYear || null},
        ${Number.parseFloat(row.vote_average) || 0},
        ${Number.parseInt(row.vote_count, 10) || 0},
        ${Number.parseFloat(row.popularity) || 0},
        ${BigInt(row.budget || "0")},
        ${BigInt(row.revenue || "0")},
        NOW()
      );
    `;

    insertedCount++;
    if (insertedCount % 500 === 0) {
      console.log(
        `✅ ${insertedCount}/${rawMovies.length} filmes inseridos...`,
      );
    }
  }

  console.log(
    `✨ Ingestão de dados concluída com sucesso! Total: ${insertedCount} filmes.`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
