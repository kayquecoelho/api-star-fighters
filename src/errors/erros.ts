export function unprocessableEntity(entity: string) {
  return {
    type: "error_unprocessable_entity",
    message: `${entity} is not valid! Check your data`,
  };
}
export function notFound(entity: string) {
  return {
    type: "error_not_found",
    message: `User ${entity} provided does not exist! Try another user!`,
  };
}
