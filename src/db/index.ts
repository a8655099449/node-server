import { DataSource, createConnection } from "typeorm";
import { User } from "../entities/User";

import path from "path";


const AppDataSource =  new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "base.db"),
  synchronize: true,
  logging: true,
  entities: [User],
});




export default AppDataSource
