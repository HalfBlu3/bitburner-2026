/** @param {NS} ns */
export function has(arr, str) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].getName() == str) {
      return true;
    }
  }
  return false;
}