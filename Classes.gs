class Customer {
  constructor (name, email, discord, shipping) {
    this.name = name;
    this.email = email;
    this.discord = discord;
    this.shipping = shipping;
  }
}
class Type {
  constructor (name, mods, symmetry) {
    this.name = name;
    this.mods = mods;
    this.symmetry = symmetry;
  }
}

class Mod{
  constructor (type, name, prices){
    this.type = type;
    this.name = name;
    this.prices = prices;
  }
  get modInfo() {
    return 'Type: ${this.type}, Name: ${this.name}, Prices: ${this.prices}';
  }
}

function populateMod(sheet) {
  modsfromSheet = sheet.getDataRange().getValues();
  name = sheet.getSheetName();
  var mods;
  var options;
  var sheetMod = new Type(name, mods, options);
  modDict = {};
  for (const mm of modsfromSheet){
      var mods = new Mod(sheetMod, mm[0], options, [mm[1], mm[2], mm[3]]);
      Logger.log(mods.modPrint())
  };
  
};
