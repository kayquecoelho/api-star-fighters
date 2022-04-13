import * as githubService from "./gitHubService.js";
import * as errors from "../errors/erros.js";
import * as battleRepository from "../repositories/index.js";

export async function playBattle(firstUser: string, secondUser: string) {
  const firstUserRepo = await githubService.getUserRepositories(firstUser);
  if (firstUserRepo.status === 404) throw errors.notFound(firstUser);

  const secondUserRepo = await githubService.getUserRepositories(secondUser);
  if (secondUserRepo.status === 404) throw errors.notFound(secondUser);

  await checkExistenceOfUsers(firstUser, secondUser);

  const firstUserScore = firstUserRepo.data.reduce((totalScore: number, repository) => (
    totalScore + repository.stargazers_count
  ), 0);
  const secondUserScore = secondUserRepo.data.reduce((totalScore: number, repository) => (
    totalScore + repository.stargazers_count
  ), 0);
  
  let [winner, loser, draw]: [string|null, string|null, boolean] = [null, null, false];

  if (firstUserScore > secondUserScore) {
    winner = firstUser;
    loser = secondUser;
  } else if (secondUserScore > firstUserScore) {
    winner = secondUser;
    loser = firstUser;
  } else {
    draw = true;
  }

  if (winner) {
    await battleRepository.claimGameWinner(winner);
  }
  if (loser) {
    await battleRepository.claimGameLoser(loser);
  }
  if (draw){
    await battleRepository.claimGameDraw(firstUser, secondUser);
  }

  const gameResult = {
    winner,
    loser, 
    draw
  };
  return gameResult;
}

export async function checkExistenceOfUsers(firstUser: string, secondUser: string) {
  const firstUserExists = await battleRepository.findFighter(firstUser);

  if (firstUserExists.rowCount === 0) {
    await battleRepository.insertFighter(firstUser);
  }
  const secondUserExists = await battleRepository.findFighter(secondUser);

  if (secondUserExists.rowCount === 0) {
    await battleRepository.insertFighter(secondUser);
  }
}
