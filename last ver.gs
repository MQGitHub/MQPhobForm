function myFunction() {
  // [RegularPrice, NAPrice, EUPrice]
  /*var priceDict = {
  "Bald Buttons": [70, 80, 60], "Ergo Triggers": [50, 60, 40], "Ergo Trigger L": [30, 40, 30], "Ergo Trigger R":  [30, 40, 30], "Tactile Z": [10, 15, 15], "Slickbox": [20, 25, 20], "Trigger Plugs": [5, 5, 5], "Low Force Triggers": [30, 40, 30], "Mouseclick ABXY": [60, 80, 65], "Mouseclick L": [12.5, 20, 20], "FF Notches (left,top,right)": [100, 120, 100], "Wavedash Notches": [45, 50, 60], "Paracord": [55, 60, 45], "Wavespring": [20, 25, 20], "Install": [100, 130, 100], "Motherboard": [150, 180, 150], "Full Builds": [200, 230, 200], "Bottom Notch": [25, 40, 40], "Standard (black,indigo,orange)": [200, 230, 200], "White or Emerald": [250, 290, 250], "Mario": [310, 360, 310], "Mouseclick R": [12.5, 20, 20], "Grey Stickbox Replacement": [20, 20, 15], "C Stickbox Replacement": [20, 20, 15], "Stickbox Lubing": [10, 10, 10], "Potentiometer Replacement Grey Stick": [40, 50, 50], "Potentiometer Replacement C Stick": [40, 50, 50], "Trigger Pot Replacement L": [20, 25, 25], "Trigger Pot Replacement R": [20, 25, 25], "Snapback Capacitor Grey Stick": [20, 30, 30], "Snapback Capacitor C Stick": [20, 30, 30], "Snapback Module Grey Stick": [40, 60, 60], "Snapback Module C Stick": [40, 60, 60], "Cable Replacement": [20, 30, 30], "OEM Notches":	[30, 30, 30]
  }


  //var typeIndex = {"Full Phob Controller": 1, "Motherboard": 3, "Install": 2, "Repair Job or Mods": 0};
  //var shell = e.namedValues["Shell"];

  //options with same name will populate namedvalues array with undefined value
  //avoid empty array error.
  
  var mods = [];
  var repair = [];
  var triggers = [];

  /*var detailsIndex = type === "Install" ? 0 : 1; 
  var details = e.namedValues["Additional Details"][detailsIndex];

  try {
    mods = e.namedValues["Mods"][typeIndex[type]].split(", ");
  } catch {
    mods = []
  };
  try {
    var triggers = e.namedValues["Trigger Plugs. Select N/A if none"][typeIndex[type]].split(", ");
  } catch {
    triggers = [];
  };
  try {
    repair = e.namedValues["Repairs"][0].split(", ");
  } catch {
    repair = [];
  };
  
  //set prices from priceDict based on form
  var priceIndex = 1; //NAPrice
  var currencySymbol = "$";
  if (currency === "EU") {
    priceIndex = 2; //EUPrice
    currencySymbol = "€"; 
  } else if (type === "Full Phob Controller") {
    priceIndex = 0; //RegularPrice
  };


  //var priceSectionNames = [mods, shell, repair];
  var repairText = '';
  var modText = '';
  //Logger.log('all priced ' + priceSectionNames);

  priceDict.forEach(function(service, index) {
    //Logger.log("The value at psn " + index + " is " + service + ".");
    service.forEach(function(mod, modIndex){
      //Logger.log("The value at s " + modIndex + " is " + mod + ".");
      if (mod in priceDict) {
        //Logger.log(priceDict[mod][priceIndex])
        orderPrices[mod] = priceDict[mod][priceIndex]
        if (service === repair) {
          repairText += mod + ': ' + currencySymbol + orderPrices[mod] + ', ';
        } else if (service === mods) {
          modText += mod + ': ' + currencySymbol + orderPrices[mod] + ', ';
        }
      };
    });
  });

  //same issue with repeat names populating arrays with null
  if (type === "Motherboard" || type == "Install") {
    orderPrices[type] = priceDict[type][priceIndex];
  };*/

  //Logger.log(orderPrices);
}
