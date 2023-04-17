// @ts-ignore
import express from "express";
import http from "http";
// @ts-ignore
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import routes from "./routes";
import { connectDatabase } from "./startup/postgreSQL";
import { validateConfig } from "./startup/config";
import { initializeLogging } from "./startup/logging";

dotenv.config();

const { PORT = 8080 } = process.env;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.get("/", (req: any, res: any) =>
  res.status(200).json({
    message: "Server is up and running",
  })
);

//intialize winston to log erros on logfile.log
initializeLogging();

//checking necessary configurations before starting server
// validateConfig(app);

//connecting to database
connectDatabase();

//calling all routes
app.use(routes);

server.listen(PORT, () => console.log(`Server starting on port: ${PORT}`));
