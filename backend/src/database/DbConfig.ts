import mysql from "mysql2/promise";

export const dbConfig = ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

export const DbConnection = mysql.createPool(dbConfig);