/** @param {NS} ns */
import { red, green } from "util/colors.js"
export async function main(ns) {
  var maxLevel = 200;
  var maxRam = 64;
  var maxCores = 16;
  var text = ns.args.includes("-v") ? true : false;
  ns.tprint("running autohacknet " + (text ? "verbose" : "silent"));
  while (ns.hacknet.numNodes() == 0) {
    if (text) {
      ns.tprint("purchased node " + ns.hacknet.purchaseNode());
    } else {
      ns.hacknet.purchaseNode()
    }
    await ns.sleep(10);
  }
  while (true) {
    for (var i = 0; i < ns.hacknet.numNodes(); i++) {
      //LEVEL
      //if the node level is below threshhold, check if we can upgrade it
      if (ns.hacknet.getNodeStats(i).level < maxLevel && canUpgrade(i, 1)[0]) {
        //if we can upgrade level
        //checks each number of upgrades until we cant afford it or until we go past the target level
        var amt = 0;
        while (canUpgrade(i, amt)[0] && ns.hacknet.getNodeStats(i).level + amt <= maxLevel) {
          amt++
        }
        //reduces amt by one to account for the failed check
        amt--;
        //purchase the number of upgrades
        if (ns.hacknet.upgradeLevel(i, amt) && text) {
          if (text) {
            ns.tprint(green() + "upgraded " + i + " level " + (amt) + " times");
          }
        } else {
          if (text) {
            ns.tprint(red() + "failed to upgrade " + i + " level " + (amt) + " times");
          }
        }
      }
      //RAM
      if (ns.hacknet.getNodeStats(i).ram < maxRam && canUpgrade(i, 1)[1]) {
        var amt = 0;
        while (canUpgrade(i, amt)[1] && ns.hacknet.getNodeStats(i).ram + amt <= maxRam) {
          amt++
        }
        amt--
        if (ns.hacknet.upgradeRam(i, amt) && text) {
          if (text) {
            ns.tprint(green() + "upgraded " + i + " ram " + (amt) + " times");
          }
        } else {
          if (text) {
            ns.tprint(red() + "failed to upgrade " + i + " ram " + (amt) + " times");
          }
        }
      }
      //CPU
      if (ns.hacknet.getNodeStats(i).cores < maxCores && canUpgrade(i, 1)[2]) {
        var amt = 0;
        while (canUpgrade(i, amt)[2] && ns.hacknet.getNodeStats(i).cores + amt <= maxCores) {
          amt++
        }
        amt--;
        if (ns.hacknet.upgradeCore(i, amt)) {
          if (text) {
            ns.tprint(green() + "upgraded " + i + " cores " + (amt) + " times");
          }
        } else {
          if (text) {
            ns.tprint(red() + "failed to upgrade " + i + " cores " + (amt) + " times");
          }
        }
      }
      //nodes
      if (ns.hacknet.getPurchaseNodeCost() < ns.getServerMoneyAvailable("home")) {
        if (text) {
          ns.tprint("purchased node " + ns.hacknet.purchaseNode());
        } else {
          ns.hacknet.purchaseNode()
        }
      }
      await ns.sleep(1);
    }
  }

  function canUpgrade(num, amt) {
    //tracks the specific upgrades we can afford
    var types = [false, false, false]
    if (ns.hacknet.getLevelUpgradeCost(num, amt) <= ns.getServerMoneyAvailable("home")) {
      types[0] = true;
      //ns.tprint("Lcheck " + i + "," + amt + "[" + types[0] + "]");
    }
    if (ns.hacknet.getRamUpgradeCost(num, amt) <= ns.getServerMoneyAvailable("home")) {
      types[1] = true;
      //ns.tprint("Rcheck " + i + "," + amt + "[" + types[1] + "]");
    }
    if (ns.hacknet.getCoreUpgradeCost(num, amt) <= ns.getServerMoneyAvailable("home")) {
      types[2] = true;
      //ns.tprint("Ccheck " + i + "," + amt + "[" + types[2] + "]");
    }
    return types;
  }
}