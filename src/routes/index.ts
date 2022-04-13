import { Router } from "express";
import { getRanking, playBattle } from "../controllers/index.js";
import validateSchema from "../middlewares/validateSchema.js";
import battleSchema from "../schemas/battleSchema.js";

const router = Router();

router.post("/battle", validateSchema(battleSchema), playBattle);
router.get("/ranking", getRanking);

export default router;