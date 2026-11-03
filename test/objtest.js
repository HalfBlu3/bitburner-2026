/** @param {NS} ns */
class myobj{
  constructor(v, vv){
    this.v=v;
    this.vv=vv;
  }
  getv(){return this.v;}
  getvv(){return this.vv;}
}
export async function main(ns) {
  var testobj = new myobj(1, 2);
  var t = [];
  t.push(new myobj((1),(2)));
  t.push(new myobj((3),(4)));
  t.push(new myobj((5),(6)));
  ns.tprint(testobj);
  ns.tprint(testobj.v + ", " + testobj.getv());
  if (testobj.v == testobj.getv()){
    ns.tprint("pass");
  } else {
    ns.tprint("fail");
  }
  ns.tprint(t);
}