import { DataSource } from "typeorm";
import { DATABSE } from "./constants.config.js";

export const TypeOrmConfig = new DataSource({
  type: "mongodb",
  host: DATABSE.host,
  port: DATABSE.port,
  database: DATABSE.database,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
});
