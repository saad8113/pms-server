import winston from "winston";
import helmet from "helmet";
// @ts-ignore
import compression from "compression";
// @ts-ignore
import curlExpress from "express-curl";
// @ts-ignore
import morgan = require("morgan");

const {
  JWT_PRIVATE_KEY,
  ENVIRONMENT,
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

export const validateConfig = (app: any) => {
  if (!JWT_PRIVATE_KEY) {
    winston.error("FATAL ERROR: JWT_PRIVATE_KEY is not defined!");
    process.exit(1);
  }
  if (!DB_HOST) {
    winston.error("FATAL ERROR: DB_HOST is not defined!");
    process.exit(1);
  }
  if (!DB_USER) {
    winston.error("FATAL ERROR: DB_USER is not defined!");
    process.exit(1);
  }
  if (!DB_PORT) {
    winston.error("FATAL ERROR: DB_PORT is not defined!");
    process.exit(1);
  }
  if (!DB_PASSWORD) {
    winston.error("FATAL ERROR: DB_PASSWORD is not defined!");
    process.exit(1);
  }
  if (!DB_NAME) {
    winston.error("FATAL ERROR: DB_NAME is not defined!");
    process.exit(1);
  }

  switch (ENVIRONMENT) {
    case "production":
      app.use(helmet());
      app.use(compression());
      app.use(curlExpress);
      break;

    default:
      app.use(morgan("tiny"));
      break;
  }
};
