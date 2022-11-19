export const isValidFields = (object: any) => {
  if (object === null || object === undefined) {
    return false;
  }

  if (Object.keys(object).length === 0) {
    return false;
  }
  console.log(object);

  if (Object.values(object).every((value) => value !== "") === false) {
    return false;
  }

  return true;
};
