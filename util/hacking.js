import {red, yellow, reset} from "util/colors.js"
/** @param {NS} ns */
export async function main(ns) {
  ns.tprint(yellow()+"util/hacking.js is a library script, and "+red()+"is not intended to be called directly");
  ns.tprint(yellow()+"this script was likely called in error, check your parent program");
}

export async function crack(ns, serverName){

}