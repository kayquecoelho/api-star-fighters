import { NextFunction, Request, Response } from "express";


export default function errorHandler(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "error_unprocessable_entity") {
    return res.status(422).send(error.message);
  }
  if (error.type === "error_not_found" || error.response.status === 404) {
    return res.status(404).send(error.message);
  }

  console.log(error);
  res.sendStatus(500);
}
