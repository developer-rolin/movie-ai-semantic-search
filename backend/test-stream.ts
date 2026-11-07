import csvParser from "csv-parser";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(import.meta);

// Caminho para o arquivo que vamos ler
const filePath = path.join(__dirname, "filmes_teste.csv");

console.log(filePath, "gile");

function visualizarLeituraEmTempoReal(caminhoDoArquivo: string) {
  console.log("🏁 [Início] Abrindo o fluxo de leitura...");

  const listaTemporaria: any[] = [];
  let contadorDeLinhas = 0;

  // 1. Abre o cano de leitura do arquivo
  const fluxoLeitura = fs.createReadStream(caminhoDoArquivo);
  console.log(fluxoLeitura, "fluxo");

  // 2. Conecta o cano ao conversor de CSV
  const conversorCsv = fluxoLeitura.pipe(csvParser());
  console.log(conversorCsv, "conversorCsv");

  // 3. Escuta cada pedaço de dado (linha) que chega
  conversorCsv.on("data", (linhaObjeto) => {
    contadorDeLinhas++;
    console.log(`\n📥 [Evento: data] Linha #${contadorDeLinhas} processada!`);
    console.log("Conteúdo convertido em objeto:", linhaObjeto);

    listaTemporaria.push(linhaObjeto);
  });

  // 4. Escuta o final do arquivo
  conversorCsv.on("end", () => {
    console.log("\n🏁 [Evento: end] O arquivo chegou ao fim!");
    console.log(`📊 Total de linhas lidas com sucesso: ${contadorDeLinhas}`);
    console.log("Estrutura final na memória:", listaTemporaria);
  });

  // 5. Escuta se acontecer algum erro (ex: arquivo não existe)
  conversorCsv.on("error", (erro) => {
    console.error("\n❌ [Evento: error] Algo deu errado na leitura:");
    console.error(erro.message);
  });
}

// Executa a nossa função de visualização
visualizarLeituraEmTempoReal(filePath);
