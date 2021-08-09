export function booleanArrayFindObject(array, itemToFind, objName) {
  if (array.find((item) => item[objName] === itemToFind)) return true;
  return false;
}
