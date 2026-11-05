/** @param {NS} ns */
import * as color from "util/colors.js";
import { has } from "util/general.js";

export async function main(ns) {
  //this is a test function
  await showMap(ns);
}

export class server {
  constructor(name, depth) { this.name = name; this.depth = depth; }
  getName() { return this.name; }
  getDepth() { return this.depth; }
}

export async function getRawServerList(ns) {
  var queue = [];
  var finish = [];
  //add home as the first server to scan
  queue.push(new server("home", 0));
  while (queue.length > 0) {
    //save the index of the current scan
    var v = queue.length - 1;
    //save the depth of the parent
    var d = queue[v].getDepth();
    var results = [];
    results = await ns.scan(queue[v].getName());
    if (!has(finish, queue[v].getName())) {
      //add the scanned server to the output
      finish.push(queue[v]);
    }
    for (var i = 0; i < results.length; i++) {
      if (!(has(finish, results[i]) || has(queue, results[i]))) {
        //add a server object of the child
        queue.push(new server(results[i], d + 1));
      }
    }
    //remove the scanned server from the queue
    queue.splice(v, 1);
  }
  //ns.tprint(finish);
  return finish;
}

export async function getServerList(ns) {
  var raw = await getRawServerList(ns);
  var out = [];
  for (var i = 0; i < raw.length; i++) { out.push(raw[i].getName()); }
  return out;
}

export async function showMap(ns) {
  //for the love of christ do not use, unfixed code from person repo
  var finish = await getRawServerList(ns);
  //generates a string with the number of indents we need
  ns.tprint(color.white() + "|-------------------KEY--------------------|");
  ns.tprint(color.white() + "|Home server / Whitelisted / Hacknet server|");
  ns.tprint(color.green() + "|Root access                               |");
  ns.tprint(color.magenta() + "|Hackable                                  |");
  ns.tprint(color.yellow() + "|Programs present, but level too low       |");
  ns.tprint(color.cyan() + "|Programs missing but sufficient level     |");
  ns.tprint(color.red() + "|Programs missing and level too low        |");
  ns.tprint("");
  ns.tprint("-----Map-----");
  for (var i = 0; i < finish.length; i++) {
    var s = "";
    for (var ii = 0; ii < finish[i].getDepth(); ii++) s += ("|    ");
    //home
    if (finish[i].getName() == "home") {
      ns.tprint(color.white() + "home");
    } else if (ns.read("whitelist.txt").split(",").includes(finish[i].getName()) || finish[i].getName().includes("hacknet-server")) {
      ns.tprint(color.white() + s + finish[i].getName());
    } else {
      //root
      if (ns.hasRootAccess(finish[i].getName())) {
        ns.tprint(color.green() + s + finish[i].getName());
      } else if (ns.getServerRequiredHackingLevel(finish[i].getName()) > ns.getHackingLevel()) {
        //programs no level
        if (hackable(ns.getServerNumPortsRequired(finish[i].getName()))) {
          ns.tprint(color.yellow() + s + finish[i].getName() + " (" + ns.getHackingLevel() + "/" + ns.getServerRequiredHackingLevel(finish[i].getName()) + ")");
        } else {
          //no level no programs
          var t = "";
          for (var ii = 0; ii < ns.getServerNumPortsRequired(finish[i].getName()); ii++) {
            t += (ns.fileExists(["brutessh.exe", "ftpcrack.exe", "relaysmtp.exe", "httpworm.exe", "sqlinject.exe"][ii], "home") ? "" : (t == "" ? "" : ", ") + ["brutessh.exe", "ftpcrack.exe", "relaysmtp.exe", "httpworm.exe", "sqlinject.exe"][ii]);
          }
          ns.tprint(color.red() + s + finish[i].getName() + " (" + t + ", " + ns.getHackingLevel() + "/" + ns.getServerRequiredHackingLevel(finish[i].getName()) + ")");
        }
      } else {
        //SUFFICIENT LEVEL
        if (hackable(ns.getServerNumPortsRequired(finish[i].getName()))) {
          //hackable
          ns.tprint(color.magenta() + s + finish[i].getName());
        } else {
          //programs but no level
          var t = "";
          for (var ii = 0; ii < ns.getServerNumPortsRequired(finish[i].getName()); ii++) {
            t += (ns.fileExists(["brutessh.exe", "ftpcrack.exe", "relaysmtp.exe", "httpworm.exe", "sqlinject.exe"][ii], "home") ? "" : (t == "" ? "" : ", ") + ["brutessh.exe", "ftpcrack.exe", "relaysmtp.exe", "httpworm.exe", "sqlinject.exe"][ii]);
          }
          ns.tprint(color.cyan() + s + finish[i].getName() + " (" + t + ")");
        }
      }
    }
  }
  function hackable(ports) {
    switch (ports) {
      case 1: return ns.fileExists("brutessh.exe");
      case 2: return ns.fileExists("brutessh.exe") && ns.fileExists("ftpcrack.exe");
      case 3: return ns.fileExists("brutessh.exe") && ns.fileExists("ftpcrack.exe") && ns.fileExists("relaysmtp.exe");
      case 4: return ns.fileExists("brutessh.exe") && ns.fileExists("ftpcrack.exe") && ns.fileExists("relaysmtp.exe") && ns.fileExists("httpworm.exe");
      case 5: return ns.fileExists("brutessh.exe") && ns.fileExists("ftpcrack.exe") && ns.fileExists("relaysmtp.exe") && ns.fileExists("httpworm.exe") && ns.fileExists("sqlinject.exe");
    }
  }
}