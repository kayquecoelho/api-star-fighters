import * as githubService from "./gitHubService.js";
import * as battleRepository from "../repositories/index.js";

export async function playBattle(firstUser: string, secondUser: string) {
  const firstUserRepo = await getUserRepo(firstUser);

  const secondUserRepo = await getUserRepo(secondUser);

  await checkExistenceOfUsers(firstUser, secondUser);
  
  const firstUserScore = calculateScore(firstUserRepo.data);
  const secondUserScore = calculateScore(secondUserRepo.data);

  const gameResult = await claimResult(
    firstUserScore,
    secondUserScore,
    firstUser,
    secondUser
  );

  return gameResult;
}

export async function getRanking() {
  const ranking = await battleRepository.getRanking();

  return { fighters: ranking };
}

async function claimResult(
  firstUserScore: number,
  secondUserScore: number,
  firstUser: string,
  secondUser: string
) {
  let [winner, loser, draw]: [string | null, string | null, boolean] = [
    null,
    null,
    false,
  ];

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
  if (draw) {
    await battleRepository.claimGameDraw(firstUser, secondUser);
  }

  const gameResult = {
    winner,
    loser,
    draw,
  };
  return gameResult;
}

async function getUserRepo(user: string) {
  const UserRepo = await githubService.getUserRepositories(user);

  return UserRepo;
}

async function checkExistenceOfUsers(firstUser: string, secondUser: string) {
  await findFighter(firstUser);

  await findFighter(secondUser);
}

async function findFighter(fighter: string) {
  const fighterExists = await battleRepository.findFighter(fighter);

  if (fighterExists.rowCount === 0) {
    await battleRepository.insertFighter(fighter);
  }
}

function calculateScore(repositories: any[]) {
  const score = repositories.reduce(
    (totalScore: number, repository) =>
      totalScore + repository.stargazers_count,
    0
  );
  return score;
}
