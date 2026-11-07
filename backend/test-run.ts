import csvParser from "csv-parser";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 1. Definimos o tipo de dado que esperamos do CSV
interface MovieRow {
  id: string;
  title: string;
  release_date: string;
}

async function executarTeste() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // 🔥 DECLARAÇÃO CORRIGIDA: Definindo o filePath antes de usá-lo
  const filePath = path.join(__dirname, "filmes_teste.csv");

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

  // 2. Cria um arquivo CSV temporário para o teste (Agora o filePath existe!)
  const dadosFicticios =
    "id,title,release_date\n" +
    "800,Avatar,2009-12-18\n" +
    "900,The Matrix,1999-03-31\n";

  fs.writeFileSync(filePath, dadosFicticios, "utf-8");
  console.log("📝 Arquivo CSV de teste criado com sucesso.");

  try {
    // 3. Executa a sua função passando a interface correspondente
    console.log("⏳ Lendo e processando o CSV...");
    const filmes = await readCsv<MovieRow>(filePath);

    // 4. Exibe os resultados no terminal para validação visual
    console.log("\n🚀 Resultado do parse do CSV:");
    console.dir(filmes, { depth: null });

    // Exemplo de validação manual via código (Assertion)
    if (filmes.length === 2 && filmes[0]?.title === "Avatar") {
      console.log(
        "\n✅ TESTE PASSOU: Os dados foram lidos e estruturados perfeitamente!",
      );
    } else {
      console.error(
        "\n❌ TESTE FALHOU: Os dados retornados não são os esperados.",
      );
    }
  } catch (error) {
    console.error("\n❌ Erro durante a execução do teste:", error);
  } finally {
    // 5. Remove o arquivo de teste para limpar a pasta
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🧹 Arquivo temporário de teste removido.");
    }
  }
}

// Executa a função de teste
executarTeste();
