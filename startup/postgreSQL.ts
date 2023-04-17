// @ts-ignore
import { Client } from "pg";
import winston from "winston";

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

export const client = new Client({
  // host: DB_HOST,
  // user: DB_USER,
  // port: DB_PORT,
  // password: DB_PASSWORD,
  // database: DB_NAME,
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Saad_Postgress",
  database: "Project-Management-System",
});

export const connectDatabase = () => {
  try {
    client.connect();
    console.log("Connected to PostgreSQL");
  } catch (err: any) {
    winston.error(err.message, err);
  }
};
