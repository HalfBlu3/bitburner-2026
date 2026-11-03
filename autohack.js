/** @param {NS} ns */
import * as color from "util/colors.js";
import * as map from "util/map.js";
export async function main(ns) {
  var startinglist = await map.getServerList(ns);
  for (var i=0; i<startinglist.length; i++){
    if (startinglist[i]!="home"){
      ns.tprint("---"+startinglist[i]+"---");
      if(!ns.hasRootAccess(startinglist[i])){
        ns.tprint("nuke: "+(ns.nuke(startinglist[i])? color.red()+"failed": "success"));
      } else {
        ns.tprint(color.cyan()+"root access already present, skipping nuke");
      }
      if (ns.hasRootAccess(startinglist[i])){
        ns.killall(startinglist[i]);
        if (!ns.fileExists("b_hackloop.js", startinglist[i])){
          ns.tprint("hackloop not found, sending...");
          ns.tprint(ns.scp("b_hackloop.js", startinglist[i], "home")? color.green()+"sent sucessfully":color.red()+"send failed");
        }
        // pid of 0 indicates that it failed to run
        //ternary is used to combined running, detecting, and printing into one operation/line
        ns.tprint("hack: "+(ns.exec("b_hackloop.js", startinglist[i], Math.floor(ns.getServerMaxRam(startinglist[i])/ns.getScriptRam("b_hackloop.js")))==0? color.red()+"failed": "success, ran "+Math.floor(ns.getServerMaxRam(startinglist[i])/ns.getScriptRam("b_hackloop.js"))+" instances"));
      } else {
        ns.tprint(color.red()+"!!!"+color.yellow()+"root failed, program bypassed"+color.red()+"!!!");
      }
    }
  }
}