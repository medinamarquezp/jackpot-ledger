import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

const dev = "development";
const env = process.env.NODE_ENV || dev;
const rootPath = process.cwd();

dotenvConfig({ path: resolve(__dirname, `${env}.env`) });

export const app = {
    ENV: env,
    IS_DEV: env === dev,
    PORT: Number(process.env.APP_PORT) || 3000,
    LOGS_PATH: `${rootPath}/${process.env.APP_LOGS_PATH || "logs"}`,
    LOG_LEVEL: process.env.APP_LOGS_LEVEL || "info"
};