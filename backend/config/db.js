import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PG_SSL === "true" ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected successfully!"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

export default pool;
