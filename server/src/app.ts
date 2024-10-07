import express from "express";
import routes from "./routes/UserRoutes";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js frontend
  credentials: true,               // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods (ensure these match your API)
  allowedHeaders: ['Content-Type', 'Authorization'], // Include necessary headers
}));

app.use(express.json());
app.use(cookieParser());


// import das rotas
app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
