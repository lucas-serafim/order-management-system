import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

export const databaseConfig: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [
        __dirname + '/entities/*.entity.{ts,js}'
     ],
     migrations: [
        __dirname + '/migrations/*.{ts,js}'
     ],
     logging: true,
     synchronize: false,
    migrationsTableName: "migrations"
}

const dabaseSource = new DataSource(databaseConfig);

export default dabaseSource;