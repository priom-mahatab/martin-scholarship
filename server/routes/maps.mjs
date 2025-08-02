import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2/promise";
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
    const [displacementRes] = await db.execute("SELECT * FROM displacement");
    const [ownershipRes] = await db.execute("SELECT * FROM ownership");
    // const [religionRes] = await db.execute("SELECT * FROM religion");
    const [literacyRes] = await db.execute("SELECT * FROM education");
    const [roofRes] = await db.execute("SELECT * FROM roof");
    const [floorRes] = await db.execute("SELECT * FROM base");
    const [wallRes] = await db.execute("SELECT * FROM wall");
    const [happinessRes] = await db.execute("SELECT * FROM happiness");
    const [sufferingsRes] = await db.execute("SELECT * FROM sufferings");
    res.json({
      displacementRes,
      ownershipRes,
      literacyRes,
      roofRes,
      floorRes,
      wallRes,
      happinessRes,
      sufferingsRes
    });

  } catch(err) {
    console.error("Error fetching data", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
