/** @param {NS} ns */
export async function main(ns) {
  // Prints a link to the terminal. Clicking on it is equivalent
  // to typing `connect joesguns; connect zer0; connect silver-helix`.
  ns.tprintRaw(ns.ui.createConnectLink(['joesguns', 'zer0', 'silver-helix']));
}