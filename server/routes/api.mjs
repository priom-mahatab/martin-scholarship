import { Router } from "express";
import dashboardRouter from "./dashboard.mjs";
import mapsRouter from "./maps.mjs";
import storiesRouter from "./stories.mjs";

const router = Router();

router.use("/dashboard", dashboardRouter);
router.use("/map", mapsRouter);
router.use("/stories", storiesRouter);

export default router;