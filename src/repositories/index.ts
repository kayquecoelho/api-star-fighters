import connection from "../database.js";

export async function claimGameWinner(username: string){
  await connection.query(`
    UPDATE fighters SET wins=wins+1 WHERE username=$1
  `, [username]);
}

export async function claimGameLoser(username: string) {
  await connection.query(`
    UPDATE fighters SET losses=losses+1 WHERE username=$1
  `, [username]);
}

export async function claimGameDraw(firstUser: string, secondUser:string) {
  await connection.query(`
    UPDATE fighters SET draws=draws+1 WHERE username=$1 OR username=$2
  `, [firstUser, secondUser]);
}

export async function findFighter(username: string) {
  const result = await connection.query(`
    SELECT username FROM fighters WHERE username=$1`, [username]);
  return result;
}

export async function insertFighter(username: string) {
  await connection.query(`
    INSERT INTO fighters (username, wins, draws, losses) VALUES ($1, 0, 0, 0)
  `, [username]);
}