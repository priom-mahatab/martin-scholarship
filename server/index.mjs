import express, { json } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import apiRoutes from "./routes/api.mjs";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(json());

const limiter = rateLimit({
  windowsMs: 15 * 60* 1000,
  max: 100,
});

app.use("/api", limiter);
app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.get("/", (req, res) => {
  res.send("Hello from the Express backend!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found"});
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});