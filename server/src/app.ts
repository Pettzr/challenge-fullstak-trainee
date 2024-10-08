import express from "express";
import routesUser from "./routes/UserRoutes";
import routesEvent from "./routes/EventRoutes"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,              
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))

// import das rotas
app.use("/", routesUser);
app.use("/", routesEvent)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
