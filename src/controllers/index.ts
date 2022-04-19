import { Request, Response } from "express";
import { Battle } from "../schemas/battleSchema.js";
import * as battleService from "../services/index.js";

export async function playBattle(req: Request, res: Response) {
  const { firstUser, secondUser } = <Battle>req.body;

  const gameResult = await battleService.playBattle(firstUser, secondUser);

  res.send(gameResult);
}

export async function getRanking(req:Request, res: Response) {
  const ranking = await battleService.getRanking();

  res.send(ranking);
}