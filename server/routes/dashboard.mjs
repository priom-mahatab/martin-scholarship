import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
const router = express.Router();
const PORT = process.env.PORT || 5001;

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
    const [violenceRes] = await db.execute("SELECT * FROM violence");
    const [indicators] = await db.execute("SELECT * FROM indicators");

    const displacementRes = indicators.filter(row => row.topic.toLowerCase().includes("displacement"));
    const incomeRes = indicators.filter(row => row.topic.toLowerCase().includes("income"));
    const influenceRes = indicators.filter(row => row.topic.toLowerCase().includes("influence"));

    res.json({
      violenceRes,
      indicatorsRes: indicators,
      displacementRes,
      incomeRes,
      influenceRes
    });

  } catch(err) {
    console.error("Error fetching dashboard data", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
