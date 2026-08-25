import express from "express";
import { prisma} from "./lib/prisma.ts"
import cors from "cors"

const app = express()
const PORT = 3001
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});



app.get("/equipes", async (req, res) => {
  const equipes = await prisma.equipe.findMany();
  res.json(equipes);
});

app.post("/equipes", async (req, res) => {
  const { nome, especialidade } = req.body;
  const equipe = await prisma.equipe.create({
    data: {
      nome,
      especialidade
    }
  });
  res.json(equipe);
});

app.put("/equipes/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, especialidade } = req.body;
  const equipe = await prisma.equipe.update({
    where: { id: parseInt(id) },
    data: {
      nome,
      especialidade
    }
  });
  res.json(equipe);
});

app.delete("/equipes/:id", async (req, res) => {
  const { id } = req.params;
  const equipe = await prisma.equipe.delete({
    where: { id: parseInt(id) }
  });
  res.json(equipe);
});


//Daqui para baixo e a parte dos desenvolvedores


app.get("/desenvolvedores", async (req, res) => {
    const desenvolvedores = await prisma.desenvolvedor.findMany();
    res.json(desenvolvedores);
});

app.post("/desenvolvedores", async (req, res) => {
    const { nome, nivel, equipeId } = req.body;
    const desenvolvedor = await prisma.desenvolvedor.create({
        data: {
            nome,
            nivel,
            equipeId
        }
    });
    res.json(desenvolvedor);
});

app.put("/desenvolvedores/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, nivel, equipeId } = req.body;
    const desenvolvedor = await prisma.desenvolvedor.update({
        where: { id: parseInt(id) },
        data: {
            nome,
            nivel,
            equipeId
        }
    });
    res.json(desenvolvedor);
});

app.delete("/desenvolvedores/:id", async (req, res) => {
    const { id } = req.params;
    const desenvolvedor = await prisma.desenvolvedor.delete({
        where: { id: parseInt(id) }
    });
    res.json(desenvolvedor);
});

//Parte do get de toas as partes 

app.get("/equipes/:id/desenvolvedores", async (req, res) => {
    const { id } = req.params;
    const desenvolvedores = await prisma.desenvolvedor.findMany({
        where: { equipeId: parseInt(id) }
    });
    res.json(desenvolvedores);
});

