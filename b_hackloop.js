/** @param {NS} ns */
export async function main(ns) {
  while(true){
    while(ns.getServerMaxMoney(ns.getHostname()) > ns.getServerMoneyAvailable(ns.getHostname())){
      await ns.grow(ns.getHostname());
    }
    while(ns.getServerMinSecurityLevel(ns.getHostname()) < ns.getServerSecurityLevel(ns.getHostname())){
      await ns.weaken(ns.getHostname());
    }
    await ns.hack(ns.getHostname());
  }
}