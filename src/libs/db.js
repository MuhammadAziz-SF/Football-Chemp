import pg from "pg";
import dotenv from "dotenv";
import logs from "../config/logs.js";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
    logs.error("Unexpected error on idle client", err);
    process.exit(-1);
});

logs.info("Database connection pool created.");

export default pool;