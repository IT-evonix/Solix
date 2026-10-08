import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

export const pool = connectionString
  ? new Pool({ connectionString })
  : new Pool({
      host: process.env.PGHOST ?? process.env.DB_HOST ?? "localhost",
      port: Number(process.env.PGPORT ?? process.env.DB_PORT ?? 5432),
      user: process.env.PGUSER ?? process.env.DB_USER ?? "postgres",
      password: process.env.PGPASSWORD ?? process.env.DB_PASSWORD,
      database: process.env.PGDATABASE ?? process.env.DB_NAME ?? "postgres",
    });
