import axios from "axios";

export async function getUserRepositories(user:string) {
  let result;
  try {
    result = await axios.get(`https://api.github.com/users/${user}/repos`);
  } catch (error) {
    result = error.response;
  }
  return result
}