import { Request, Response } from "express";
import * as battleService from "../services/index.js";

export async function playBattle(req: Request, res: Response) {
  const { firstUser, secondUser } = req.body;

  const gameResult = await battleService.playBattle(firstUser, secondUser);

  res.send(gameResult);
}