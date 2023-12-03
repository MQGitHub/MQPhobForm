class Customer {
  constructor (name, email, discord, shipping) {
    this.name = name;
    this.email = email;
    this.discord = discord;
    this.shipping = shipping;
  }
}
class Type {
  constructor (name, mods, symmetry, description = 123) {
    this.name = name;
    this.mods = mods;
    this.symmetry = symmetry;
    this.description = description;
  }

  get modsName(){
    var t = [];
    /*var t = ''
    if (this.mods === undefined){
      return '';
    }*/
    this.mods.forEach((element) => {
      t.push(element.name);
    });
    return t;
  }
  get typeInfo(){
   if (this.description === 123) {
    return `Type: Name: ${this.name}, Mods: ${this.modsName}, Symmetry: ${this.symmetry}\n`;
   } else {
    return `Type: Name: ${this.name}, Mods: ${this.modsName}, Symmetry: ${this.symmetry}, Description: ${this.description}\n`
   }
  }
}

class Mod{
  constructor (type, name, prices){
    this.type = type;
    this.name = name;
    this.prices = prices;
  }
  get modInfo() {
    return `${this.type.typeInfo}, Name: ${this.name}, Prices: ${this.prices}`;
  }
}

function populateMod(sheetObj, name) {
  sheet = sheetObj.getSheetByName(name);
  modsfromSheet = sheet.getDataRange().getValues();
  var modList = [];
  var options = false;
  var sheetMod = new Type(name, modList, options);
  var skip = 0; //skip header of spreadsheet
  for (const mm of modsfromSheet){

      if (skip === 0) {
        skip += 1;
        continue;
      }

      try {
        if (mm[6] !== '') {
        description = mm[6];
        }
      } catch(err) {
        description = 123;
      }
      if (description !== 123) {
        sheetMod.description = description;
      }

      var mod = new Mod(sheetMod, mm[0], [mm[1], mm[2], mm[3]]);
      if (String(mm[5]) === 'No') {
        sheetMod.symmetry = false;
      } else {
        sheetMod.symmetry = String(mm[5]).split(', ');
      }
      modList.push(mod);
      Logger.log(mod.modInfo + ' ' + String(mm[5]));
  };
  Logger.log("Type??" + ':' + sheetMod.typeInfo);
  return sheetMod;
};
