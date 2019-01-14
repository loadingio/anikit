// Generated by LiveScript 1.3.1
var fs, types, mods, i$, len$, ref$, name, mod, k, v, loadMod;
fs = require('fs');
types = {};
mods = fs.readdirSync('kits').filter(function(it){
  return /\.ls$/.exec(it);
}).map(function(it){
  return [it.replace(/\.ls$/, ''), require("./kits/" + it)];
});
mods = mods.filter(function(it){
  return ~['bounce-rigid', 'blink', 'blur', 'spin', 'rubber', 'tremble', 'patrol', 'slide'].indexOf(it[0]);
});
for (i$ = 0, len$ = mods.length; i$ < len$; ++i$) {
  ref$ = mods[i$], name = ref$[0], mod = ref$[1];
  if (mod.preset) {
    for (k in ref$ = mod.preset || {}) {
      v = ref$[k];
      types[k] = name;
    }
  }
}
loadMod = mods.map(function(it){
  return "  \"" + it[0] + "\": require(\"./kits/" + it[0] + "\")";
}).join(',\n');
fs.writeFileSync("kits-list.js", "var mods = {\n" + loadMod + "\n};\n\nvar types = " + JSON.stringify(types) + ";\n\nmodule.exports = {mods: mods, types: types};");