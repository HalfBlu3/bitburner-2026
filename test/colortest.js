/** @param {NS} ns */
import * as color from "util/colors.js";
export async function main(ns) {
  ns.tprint(color.brightBlack()+"hello world");
  ns.tprint(color.getColors());
  ns.tprint(color.getColorList());
}