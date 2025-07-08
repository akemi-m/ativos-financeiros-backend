// objeto ativo
import { Ativo } from "./ativo";

// importações:
// importação do node - inicializar porta
const express = require("express");
const cors = require("cors");
// banco de dados - mongodb
const fs = require("fs").promises;

// servidor
const app = express();

// inicializar cors no app
app.use(cors());
// inicializar express
app.use(express.json());

// criar caminho para o banco de dados
const DB_FILE = "./ativosfinanceirosdb.json";

// inicializar banco de dados
// async e await: garante que vai ler a linha de cima antes da de baixo
async function initDB() {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify([]));
  }
}

initDB();

// api de get - nome da api
app.get("/ativos", async (req: any, res: any) => {

  // receber do front o limite - definir um valor default
  const limit = req.query.limit || 10;

  // começar a fazer a req da api
  try {

    // banco de dados
    const dataDB = await fs.readFile(DB_FILE);

    // transformar data em json
    const ativos = JSON.parse(dataDB);

    // transformar em json para o front
    res.json(ativos);

  } catch (error: any) {
    // erro
    res.status(500).send(error.message);
  }
});

// api de post
app.post("/ativos", async (req: any, res: any) => {
  // nome, valor, data
  // abrir o obj body
  const { nome, valor, data } = req.body;

  try {
    // por conta do fuso horário, estava adicionando no banco de dados
    // com um dia atrasado, por isso tem isso aqui
    const dataCorrigida = new Date(data);
    dataCorrigida.setDate(dataCorrigida.getDate() + 1);

    // criar body de req - mandar para nosso banco de dados
    const novoAtivo = new Ativo(nome, valor, new Date(dataCorrigida));

    // banco de dados
    const dataDB = await fs.readFile(DB_FILE);

    // transformar data em json
    const ativos = JSON.parse(dataDB);

    // se não tiver algum ativo com mesmo nome e data, vai salvar no banco
    if (!ativos.some((a: any) => a.nome === nome && a.data === data)) {
      ativos.push({
        nome: novoAtivo.nome,
        valor: novoAtivo.valor,
        // formato YYYY-MM-DD
        data: novoAtivo.data.toLocaleDateString("en-CA")
      });

      // transformar em json e salva no banco de dados
      await fs.writeFile(DB_FILE, JSON.stringify(ativos, null, 2));

      res.status(200).send("Ativo financeiro salvo!");

    } else {
      res.status(400).send("Já existe um ativo financeiro com esse nome e essa data.");
    }

  } catch (error: any) {
    // erro do servidor
    res.status(500).send(error.message);
  }
});

// definir a porta
app.listen(3000, () => console.log("servidor rodando."));
