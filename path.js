/** @param {NS} ns */
import * as map from "util/map.js"
export async function main(ns) {
  ns.tprint(await map.path(ns, ns.args[0], ns.getHostname()));
}