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

  updateMods(mod, sheetObj, options = []){
    sheet = sheetObj.getSheetByName(this.name);
    modsfromSheet = sheet.getDataRange().getValues();
    var modList = [];
    var sheetMod = this;
    var skip = 0; //skip header of spreadsheet
    for (const mm of modsfromSheet){

        if (skip === 0) {
          skip += 1;
          continue;
        }

        try {
          if (mm[6] !== '') {
          description = mm[6];
          } else {
            description = '';
          }
        } catch(err) {
          description = 123;
        }
        if (description !== 123) {
          sheetMod.description = description;
        }

        if (mm[0] === mod) {
          mod = new Mod(sheetMod, mm[0], [mm[1], mm[2], mm[3]]); 
          if (options.length !== 0) {
            mod.options = options;
          }
          this.mods.push(mod)
          break;
        }

        if (String(mm[5]) === 'No') {
          sheetMod.symmetry = false;
        } else {
          sheetMod.symmetry = String(mm[5]).split(', ');
        }
        ;
        //Logger.log(mod.modInfo + ' ' + String(mm[5]));
    };
  }
}

class Mod{
  constructor (type, name, prices, options){
    this.type = type;
    this.name = name;
    this.prices = prices;
    this.options = options;
  }
  get modInfo() {
    return `${this.type.typeInfo}, Name: ${this.name}, Prices: ${this.prices}, Options: ${this.options}`;
  }
}

function populateMod(sheetObj, name, mod = 123, options = []) {
  sheet = sheetObj.getSheetByName(name);
  modsfromSheet = sheet.getDataRange().getValues();
  var modList = [];
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
        } else {
          description = '';
        }
      } catch(err) {
        description = 123;
      }
      if (description !== 123 && sheetMod.description !== null) {
        sheetMod.description = description;
      }
      var temp = {...mod};
      if (mod === 123) { 
        mod = new Mod(sheetMod, mm[0], [mm[1], mm[2], mm[3]]);
        modList.push(mod);
        mod = 123;
        //Logger.log("pop " + mm[0]);
      };

      if (mm[0] === mod) {
        mod = new Mod(sheetMod, mm[0], [mm[1], mm[2], mm[3]]);
        if (options.length !== 0) {
            mod.options = options;
        }
        modList.push(mod);
        mod = mm[0];
        //Logger.log("pop " + mm[0]);
      }

      if (String(mm[5]) === 'No') {
        sheetMod.symmetry = false;
      } else {
        sheetMod.symmetry = String(mm[5]).split(', ');
      }
      
      //mod = temp;
      //Logger.log(mod.modInfo + ' ' + String(mm[5]));
  };
  //Logger.log("Type??" + ':' + sheetMod.typeInfo);
  return sheetMod;
};

function formPopulator(mod, name) {
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1lQ6CJU3yoyuayNaS4AFGL4p1FFjEacyk8G2KmqOvKzk/edit#gid=0")
  var modSheet = populateMod(sheet, name);
  if (modSheet.description){
    mod.setHelpText(modSheet.description);
  }
  if (!modSheet.symmetry) {
    //Logger.log(modSheet.typeInfo);
    mod.setChoiceValues(modSheet.modsName);
  } else {
    mod.setRows(modSheet.modsName);
    mod.setColumns(modSheet.symmetry);
  }
  mod.setTitle(name);
}
