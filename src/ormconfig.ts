import { DataSource } from "typeorm";
import { Country } from "./entities/Country";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Country],
});

AppDataSource.initialize().catch((error) => console.log(error));
