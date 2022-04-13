import { Router } from "express";
import { playBattle } from "../controllers/index.js";
import validateSchema from "../middlewares/validateSchema.js";
import battleSchema from "../schemas/battleSchema.js";

const router = Router();

router.post("/battle", validateSchema(battleSchema), playBattle);

export default router;