import { DataSource } from "typeorm";
import { DATABSE } from "./constants.config.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TypeOrmConfig = new DataSource({
  type: "mongodb",
  url: DATABSE.uri,
  database: DATABSE.database,
  entities: [__dirname + "/../**/entity/*.entity{.ts,.js}"],
  synchronize: true,
});
