import axios from "axios";

export async function getUserRepositories(user:string) {
  let result = await axios.get(`https://api.github.com/users/${user}/repos`);
 
  return result
}