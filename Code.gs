function formPopulator(name) {
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1lQ6CJU3yoyuayNaS4AFGL4p1FFjEacyk8G2KmqOvKzk/edit#gid=0")
  var modSheet = populateMod(sheet, name);
  if (modSheet.description) {
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

function sendtext(e) {

  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1lQ6CJU3yoyuayNaS4AFGL4p1FFjEacyk8G2KmqOvKzk/edit#gid=0")

  //var problemItem = form.addParagraphTextItem();

  var stickboxrepair = 'Stickbox Repair';
  var stickboxRepairItem = populateMod(sheet, stickboxrepair);


  Logger.log(stickboxRepairItem.typeInfo);
  stickboxRepairItem.mods.forEach((modinType) => {
    Logger.log("stickboxrepair: " + modinType.modInfo)
  });
  //formPopulator(stickboxRepairItem, stickboxrepair);

  var stickbox = 'Stickbox';
  var stickboxItem = populateMod(sheet, stickbox);
  stickboxItem.mods.forEach((modinType) => {
    Logger.log("stickbox: " + modinType.modInfo)
  });

  //formPopulator(stickboxItem, stickbox);

  var triggerrepair = 'Trigger Repair';
  var triggerRepairItem = populateMod(sheet, triggerrepair);

  //formPopulator(triggerRepairItem, triggerrepair);

  var cablerepair = 'Cable Repair';
  var cableRepairItem = populateMod(sheet, cablerepair);

  //formPopulator(cableRepairItem, cablerepair);

  var oem = 'OEM';
  var oemItem = populateMod(sheet, oem);

  //formPopulator(oemItem, oem);


  var customstickbox = 'Custom Stickbox';
  var customstickboxItem = populateMod(sheet, customstickbox);

  //formPopulator(customstickboxItem, customstickbox);

  var magnet = 'Stickbox Magnet';
  var magnetItem = populateMod(sheet, magnet);

  //formPopulator(magnetItem, magnet);

  var notch = 'Notches';
  var notchItem = populateMod(sheet, notch);

  //formPopulator(notchItem, notch);

  var button = 'Buttons';
  var buttonItem = populateMod(sheet, button);

  //formPopulator(buttonItem, button);

  var trigger = 'Triggers';
  var triggerItem = populateMod(sheet, trigger);

  //formPopulator(triggerItem, trigger);

  var cable = 'Cable';
  var cableItem = populateMod(sheet, cable);

  //formPopulator(cableItem, cable);

  //const repairSheet = e.source.getSheetByName('Repairs')
  //const formSheet = e.range.getSheet();
  //const formName = formSheet.getSheetName();
  //const formDict = e.namedValues;

  /*Logger.log(e.namedValues); 
  Logger.log(e.namedValues["Stickbox [Lubrication]"]);
  Logger.log(e.namedValues["Custom Stickbox [Factory New Tightness]"]);

  const formSheet = e.range.getSheet();
  const formName = formSheet.getSheetName();
  const formDict = e.namedValues;*/
  const formDict = {
    "Stickbox [Slickbox]": ["Grey Stick, C Stick"],
    "Timestamp": ["5/13/2024 23:42:48"],
    "Custom Stickbox [Factory New Tightness]": [],
    "Custom Stickbox [Tight]": [],
    "Shipping Address, Name, and anything else you think I need to know.": ["shippingbox"],
    "Please describe the problem and/or choose the repair below": [],
    "OEM": [],
    "Buttons": ["Tactile Z, Bald Buttons"],
    "Service": ["Full Phob Controller"],
    "Shell [White or Emerald]": ["Like New"],
    "Stickbox [Replacement]": [],
    "Shell [Standard (black, indigo, orange)]": [],
    "Triggers [Mouseclick]": ["Right"],
    "Triggers [Low Force]": [],
    "Stickbox [Wavespring]": [],
    "Stickbox Repair [Snapback Capacitor]": [],
    "Time Due": ["Regular"],
    "Stickbox Magnet [N30H]": [],
    "Stickbox [Lubrication]": ["Grey Stick"],
    "Custom Stickbox [Worn in]": [],
    "Triggers [Half Plug]": ["Left"],
    "Triggers [Ergo Trigger]": ["Left, Right"],
    "Cable": ["OEM 2 Metres"],
    "Trigger Repair [Trigger Pot Replacement]": [],
    "Cable Repair": [],
    "Shell [Custom Shell]": [],
    "Stickbox Repair [Potentiometer Replacement]": [],
    "Triggers [Full Plug]": ["Right"],
    "Shell [Mario]": [],
    "Stickbox Repair [Snapback Module]": [],
    "Discord": ["discordtest"],
    "Stickbox Magnet [D12]": [],
    "Email": ["test@email.com"],
    "Stickbox Magnet [DH1H1]": [],
    "Character Main": [],
    "Tag": ["test"],
    "Notches": ["Firefox Notches (No bottom notches)"],
    "Commission idea (custom paint job) or shell name or any other details. Will contact.": ["commission idea"]
  }

  //pull variables from form
  var type = formDict["Service"][0];
  var name = formDict["Tag"][0];
  var email = formDict["Email"][0];
  var timeDue = formDict["Time Due"][0];
  var contact = formDict["Discord"][0];
  var customShell = formDict["Commission idea (custom paint job) or shell name or any other details. Will contact."][0];
  var contactInfo = formDict["Shipping Address, Name, and anything else you think I need to know."][0];
  var problem = formDict["Please describe the problem and/or choose the repair below"][0];
  var shell = 'Shell'

  var prsn = new Customer(name, email, contact, contactInfo);

  const userType = {};
  const userMod = [];
  /*
  populate userDict = {mod: [], mod: [left trigger, right trigger]}
  loops through form values
  */
  for (const key in formDict) {
    //Stickbox [Lubrication]=[Grey Stick, C Stick] modType [modName]
    //Notches=[Firefox Notches (left, top, right), OEM] modType['mod1, mod2']
    //Shell [Standard (black, indigo, orange)]=[Like New] modType [modName] 
    //Stickbox [Slickbox]=[]
    var modKey = formDict[key];
    //if mod is not selected
    var len = 0;
    for (var i = 0; i < modKey.length; i++) {
      if (modKey[i] !== undefined) {
        len++;
      }
    }
    if (len === 0 || modKey[0] === "") {
      continue;
    };

    Logger.log("mod key " + modKey);
    var modsSplit = modKey[0].split(", ") // some mods are in modType['mod1, mod2'] format
    const regex = /(.*)\W\[(.*?)\]/; // Regular expression to match modType [modName]
    const matches = key.match(regex);

    if (matches) {
      const modType = matches[1];
      const modName = matches[0].replace(/.*?\[(.*?)\].*/, '$1');//matches.map(match => match.replace(/\[|\]/g, '')); 
      Logger.log("modtype " + modType);// Remove square brackets and place in array
      if (!userType[modType]) {
        /*if (modsSplit.length != 2){
          userType[modType] = new Type(modType, userMod, false, ''); //populating with mod type 
        } else {
          userType[modType] = new Type(modType, userMod, modsSplit, '')
        }*/
        try {
          userType[modType] = populateMod(sheet, modType, modName, modKey);
          Logger.log("Type1: " + userType[modType].typeInfo);
        } catch (error) {
          delete userType[modType];
          console.log(error.message);
          continue;
        }
      } else {
        Logger.log("M1: " + modName + " T: " + modType);
        userType[modType].updateMods(modName, sheet, modKey);
        Logger.log("Type1: " + userType[modType].typeInfo);
        newMod = new Mod(modName, userType[modType], 0, modsSplit)
        //Logger.log(newMod.modInfo);
        //userMod.push(newMod);
      }
    } else { //when mod is not in grid format (not symmetrical like grey stick c stick)
      for (const m of modsSplit) {
        Logger.log("key: " + key);
        if (!userType[key]) {
          //userType[key] = new Type(key, userMod, false, '');
          try {
            userType[key] = populateMod(sheet, key, m);
            
          } catch (error) {
            console.log(error.message);
            continue;
          }
        } else {
          Logger.log("M2: " + m + " T: " + key);
          newMod = new Mod(userType[key], m, 0, [])
          //Logger.log(newMod.modInfo);
          userType[key].updateMods(m, sheet)
          Logger.log("Type2: " + userType[key].typeInfo);
          //userMod.push(newMod);
        }
      };

    };
  };

  

  for (let key in userType) {
    if (userType.hasOwnProperty(key)) {
      for (const m of userType[key].mods) {
        Logger.log(m.modInfo);
      }
      Logger.log(userType[key].typeInfo);
    }
}

  var priceIndex = 0; //NAPrice
  var currencySymbol = "$";
  /*if (currency === "EU") {
    priceIndex = 2; //EUPrice
    currencySymbol = "€"; 
  } else if (type === "Full Phob Controller") {
    priceIndex = 0; //RegularPrice
  };
  */


  //populate dict with customer order: prices
  var orderPrices = {};
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

  //make function that sums the values in a dict
  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
  const sumPrices = sumValues(orderPrices);

  //seperating notes into categories
  var notes = { "Problem": problem, "Custom Shell": customShell, "Additional Contact / Shipping": contactInfo };
  var notesText = '';
  var notesTextTasks = '';
  Object.keys(notes).forEach(function (note) {
    if (notes[note]) {
      notesText += note + ': ' + notes[note] + "<br>";
      notesTextTasks += note + ': ' + notes[note] + "\n";
    };
  });
  var services = '';
  for (const s in textDict) {
    if (s === 'Type of Serivce') {
      continue;
    }
    services += s + ": " + textDict[s][0].join(", ") + "<br>";
  };

  // create the email 
  var subject = "MQ - " + name + " - " + type + " - Queue - " + timeDue;
  //subject = type === "Custom Order" ? subject : subject +=" - Queue - " + timeDue;
  var body = "Dear " + name + ",<br><br>" +
    "Thank you for submitting your order. Here are the details of your order:<br><br>" +
    "Contact: " + contact + "<br>" +
    "Order type: " + type + "<br>" +
    services +
    "Price: " + currencySymbol + sumPrices + "<br>" +
    notesText + "<br>" +
    "The following is the list of services and their prices:<br><br>";
  for (var key in orderPrices) {
    body += key + ": " + currencySymbol + orderPrices[key] + "<br>";
  };

  body += "<br>Thank you for choosing MQ Mods!<br><br>" +
    "Best regards,<br>" +
    "MQ<br><br>" +
    "Discord: MQDiscord#0211<br>" +
    "Twitter: <a href='https://twitter.com/MQMods'>twitter.com/MQMods</a><br>" +
    "Email: <a href='mailto:mqphobgcc@gmail.com'>mqphobgcc@gmail.com</a><br>" +
    "Phob Resource: <a href='https://phobg.cc'>phobg.cc</a><br>" +
    "<img src='https://pbs.twimg.com/profile_images/1660798463347392513/AeOFyWxC_400x400.jpg'>";

  //Logger.log("Subject: " + subject);
  //Logger.log("Body: " + body);
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body,
    replyTo: "mqphobgcc@gmail.com"
  });
  body += "<br> Customer Email: " + email
  MailApp.sendEmail({
    to: "mqphobgcc@gmail.com",
    subject: subject,
    htmlBody: body,
    replyTo: "mqphobgcc@gmail.com"
  });
  //add sarah email, if bald buttons, paracords, or ergo triggers involved. include amount owed to sarah.
  var taskListId = 'Ymw5U2tVbFJhbVdRRXNWdg';


  // Task details with title and notes for inserting new task
  type = type.toString().replace(/[\-\$\d]/g, "");
  let task = {
    title: name + " - " + type + " " + " - " + timeDue + " - $" + sumPrices,
    notes: "Mods: " + services + "\n" +
      "Price: " + currencySymbol + sumPrices + "\n" +
      notesTextTasks
  };
  try {
    // Call insert method with taskDetails and taskListId to insert Task to specified tasklist.
    task = Tasks.Tasks.insert(task, taskListId);
    // Print the Task ID of created task.
    console.log('Task with ID "%s" was created.', task.id);
  } catch (err) {
    // TODO (developer) - Handle exception from Tasks.insert() of Task API
    console.log('Failed with an error %s', err.message);
  }

  /*var orderSheet = e.source.getSheetByName("Order Sheet")
  var Avals = orderSheet.getRange("A1:A").getValues();
  var Alast = Avals.filter(String).length;
  
  var columns = [timeDue, name, contact, type, repairText, modText, triggers.join(", "), shell, customShell, sumPrices, problem, details, contactInfo, '', email];
  var insertRow = orderSheet.getRange(orderSheet.getLastRow()+1, 1, 1, columns.length);
  insertRow.setValues([columns]);
  */
};
function submitEntryToGoogleForm() {

  let test = "https://docs.google.com/forms/d/e/1FAIpQLSfrpEUccM8ijnQRwIsl8tf6MR-RuWM1FOvBCiKE3j27RUB84w/viewform?usp=pp_url&entry.480049700=test&entry.1595353913=testdiscord&entry.1421422431=testemail@test.com&entry.846639614=Full+Phob+Controller&entry.1835681168=Like+New&entry.1171940899=commission+idea&entry.171317928=problem+describe&entry.136125640=C+Stick&entry.1543261005=Grey+Stick&entry.428554645=C+Stick&entry.790181065=Left&entry.790181065=Right&entry.1224103705=Paracord+2+Metres&entry.1389280691=Basic+OEM&entry.1570053502=Grey+Stick&entry.457432285=C+Stick&entry.1548813426=C+Stick&entry.534186223=Grey+Stick&entry.1912859635=Firefox+Notches+(left,+top,+right)&entry.1361480253=Tactile+Z&entry.1361480253=Bald+Buttons&entry.213691248=Grey+Stick&entry.136096342=C+Stick&entry.2024351776=Grey+Stick&entry.91576991=Left&entry.91576991=Right&entry.1583412160=Right&entry.1885848887=Left&entry.308466034=OEM+2+Metres&entry.508098032=shipping&entry.1974419628=Regular"

  let url = "https://docs.google.com/forms/d/e/1FAIpQLSfzcYJkGcVAp3KtK8lqHW4fNnlIAo1KlJhvjFLjBENU5oRgfg/formResponse?usp=pp_url&entry.1776723881=EU&entry.1788271175=eu%230000&entry.1889895950=eu@email.com&entry.1372832015=Full+Phob+Controller&entry.2092809051=White+or+Emerald&entry.685834931=FF+Notches+(left,+top,+right)&entry.685834931=Bottom+Notch&entry.685834931=Mouseclick+ABXY&entry.685834931=Mouseclick+L&entry.685834931=Low+Force+Triggers&entry.2067569380=Half+L&entry.2067569380=Full+R&entry.2079650081=contact&entry.1200455697=7+PM";

  let response = UrlFetchApp.fetch(url);

}






