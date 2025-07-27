import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();
router.use(cors());

const db = await mysql.createConnection( {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "dashboard",
});

router.get("/", async (req, res) => {
  try {
    const [stories] = await db.execute("SELECT * FROM stories");
    res.json(stories);
  } catch(err) {
    console.error("Error fetching stories data", err);
    res.status(500).json( { error: "Internal server error" });
  }
  
});

export default router;
