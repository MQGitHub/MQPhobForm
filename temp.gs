function myFunction() {
  const sheetNames = ['Stickbox', 'Triggers', 'Shell', 'Buttons', 'Notches', 'Cable', 'Type of Service'];

  const stickSheet = e.source.getSheetByName('Stickbox');
  const buttonSheet = e.source.getSheetByName('Buttons');
  const notchSheet = e.source.getSheetByName('Notches');
  const shellSheet = e.source.getSheetByName('Shells');
  const cableSheet = e.source.getSheetByName('Cable');
  const triggerSheet = e.source.getSheetByName('Triggers');
  const typeSheet = e.source.getSheetByName('Type of Service');
  const modsSheets = [stickSheet, buttonSheet, notchSheet, shellSheet, cableSheet, triggerSheet, typeSheet];

  const stickDict = {};
  const buttonDict = {};
  const notchDict = {};
  const shellDict = {};
  const cableDict = {};
  const triggersDict = {};
  const typeDict = {};
  const modsLists = [stickDict, buttonDict, shellDict, notchDict, cableDict, triggersDict, typeDict]
}


//var priceSectionNames = [mods, shell, repair];
  var repairText = '';
  const priceDict = {}
  const textDict = {}

  // create price list dict from Price List sheet
  // populate each mod type with prices
  /*
  for (var i = 0; i < sheetNames.length; i++) {
    var sheetTemp = e.source.getSheetByName(sheetNames[i])
    modsfromSheet = sheetTemp.getDataRange().getValues();
    var modText = [];
    var priceText = [];
    for (const mm of modsfromSheet){
      //modsLists[i] = modDict{ "mod": [prices] }
      //triggerDict{"Ergo": [30, 40, 30]}
      //modKey = key in namedvalues
      //Triggers [Ergo Trigger] or Buttons or Cable [3 Metres]
      //cables are grid and price dependent on both row and column
      if (mm[0] in userDict) {
        var mod = mm[0];
        modsLists[i][mod] = [parseInt(mm[1]), parseInt(mm[2]), parseInt(mm[3])];
        priceDict[mod] = [parseInt(mm[1]), parseInt(mm[2]), parseInt(mm[3])];
        userDict[mod] = userDict[mod].length == 0 ? userDict[mod] : [userDict[mod][0].split(" ,")];
        var multiplier = mm[0].includes('Plug') || userDict[mod].length == 0 ? 1 : userDict[mod].length;
        orderPrices[mod] = priceDict[mod][priceIndex]*multiplier;
        if (userDict[mod] == 'Like New')  {
          orderPrices[mod]+=20
        }
        if (mod == 'Full Plug' && orderPrices['Half Plug'] != undefined){
          orderPrices[mod] = 0;
        } else if (mod == 'Half Plug' && orderPrices['Full Plug'] != undefined){ 
          orderPrices[mod] = 0;
        }
        if (mod === 'Lubrication' && type !== 'Install') {
          orderPrices[mod] = 0;
        }
        priceText.push(currencySymbol + orderPrices[mod]);
        modText.push(mod);
        if (userDict[mod].length != 0) {
          for (const sym of userDict[mod]) {
            textDict[sym] = [modText, priceText];
            Logger.log(userDict[mod] + " " + textDict[sym] + " " + sym)
          };
        } else {
          textDict[sheetNames[i]] = [modText, priceText];
        };
      };
      
    };
  };

  */