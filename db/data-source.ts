import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config'

export const dataSourceOption: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'myDB',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migration/*.js'],
    synchronize: false,
} 

const dataSource = new DataSource(dataSourceOption)

export default dataSource