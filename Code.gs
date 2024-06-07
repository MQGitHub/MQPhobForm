function formPopulator(name) {
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1lQ6CJU3yoyuayNaS4AFGL4p1FFjEacyk8G2KmqOvKzk/edit#gid=0")
  var modSheet = populateMod(sheet, name);
  if (modSheet.description) {
    mod.setHelpText(modSheet.description);
  }
  if (!modSheet.symmetry) {
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
    "Buttons": ["Tactile Z, Bald Buttons"],
    "Cable": ["OEM 2 Metres"],
    "Cable Repair": [],
    "Character Main": [],
    "Commission idea (custom paint job) or shell name or any other details. Will contact.": ["commission idea"],
    "Custom Stickbox [Factory New Tightness]": [],
    "Custom Stickbox [Tight]": [],
    "Custom Stickbox [Worn in]": [],
    "Discord": ["discordtest"],
    "Email": ["test@email.com"],
    "Notches": ["Firefox Notches (No bottom notches)"],
    "OEM": [],
    "Please describe the problem and/or choose the repair below": [],
    "Service": ["Full Phob Controller"],
    "Shell [Custom Shell]": [],
    "Shell [Mario]": [],
    "Shell [Standard (black, indigo, orange)]": [],
    "Shell [White or Emerald]": ["Like New"],
    "Shipping Address, Name, and anything else you think I need to know.": ["shippingbox"],
    "Stickbox [Lubrication]": ["Grey Stick"],
    "Stickbox [Replacement]": [],
    "Stickbox [Slickbox]": ["Grey Stick, C Stick"],
    "Stickbox [Wavespring]": [],
    "Stickbox Magnet [D12]": [],
    "Stickbox Magnet [DH1H1]": [],
    "Stickbox Magnet [N30H]": [],
    "Stickbox Repair [Potentiometer Replacement]": [],
    "Stickbox Repair [Snapback Capacitor]": [],
    "Stickbox Repair [Snapback Module]": [],
    "Time Due": ["Regular"],
    "Timestamp": ["5/13/2024 23:42:48"],
    "Tag": ["test"],
    "Triggers [Ergo Trigger]": ["Left, Right"],
    "Triggers [Full Plug]": ["Right"],
    "Triggers [Half Plug]": ["Left"],
    "Triggers [Low Force]": [],
    "Triggers [Mouseclick]": ["Right"],
    "Trigger Repair [Trigger Pot Replacement]": []
};

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

    //Logger.log("mod key " + modKey);
    var modsSplit = modKey[0].split(", ") // some mods are in modType['mod1, mod2'] format
    const regex = /(.*)\W\[(.*?)\]/; // Regular expression to match modType [modName]
    const matches = key.match(regex);

    if (matches) {
      const modType = matches[1];
      const modName = matches[0].replace(/.*?\[(.*?)\].*/, '$1');//matches.map(match => match.replace(/\[|\]/g, '')); 
      //Logger.log("modtype " + modType);// Remove square brackets and place in array
      if (!userType[modType]) {
        try {
          userType[modType] = populateMod(sheet, modType, modName, modKey);
          //Logger.log("Type1: " + userType[modType].typeInfo);
        } catch (error) {
          delete userType[modType];
          console.log(error.message);
          continue;
        }
      } else {
        //Logger.log("M1: " + modName + " T: " + modType);
        userType[modType].updateMods(modName, sheet, modKey);
        //Logger.log("Type1: " + userType[modType].typeInfo);
        newMod = new Mod(modName, userType[modType], 0, modsSplit)
      }
    } else { //when mod is not in grid format (not symmetrical like grey stick c stick)
      for (const m of modsSplit) {
        //Logger.log("key: " + key);
        if (!userType[key]) {
          try {
            userType[key] = populateMod(sheet, key, m);
            
          } catch (error) {
            console.log(error.message);
            continue;
          }
        } else {
          //Logger.log("M2: " + m + " T: " + key);
          newMod = new Mod(userType[key], m, 0, [])
          userType[key].updateMods(m, sheet)
          //Logger.log("Type2: " + userType[key].typeInfo);
        }
      };

    };
  };

  
  

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
  var Sarah = ["Bald Buttons", "Ergo Triggers", "Paracord 2 Metres", "Paracord 3 Metres"];
  var emailSarah = False;
  var price = 0;
  var fullServices = '';
  var modsList = [];
  for (let key in userType) {
    if (userType.hasOwnProperty(key)) {
      for (const m of userType[key].mods) {
        Logger.log("code: " + m.modInfo);
        price += m.prices[0];
        if (Sarah.includes(m.name)){
          emailSarah = True;
        }
      }
      Logger.log("TEST: " + userType[key].prettyType);
      fullServices += userType[key].prettyType;
      if (userType[key].modsName.length > 0) {
        modsList.push(userType[key].modsName);
      }
      Logger.log(fullServices);
    }
}

var names = modsList.flat().join(', ');

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
  /*var services = '';
  for (const s in textDict) {
    if (s === 'Type of Serivce') {
      continue;
    }
    services += s + ": " + textDict[s][0].join(", ") + "<br>";
  };*/

  // create the email 
  var subject = "MQ - " + name + " - " + type + " - Queue - " + timeDue;
  //subject = type === "Custom Order" ? subject : subject +=" - Queue - " + timeDue;
  var body = "Dear " + name + ",<br><br>" +
    "Thank you for submitting your order. Here are the details of your order:<br><br>" +
    "Contact: " + contact + "<br>" +
    "Order type: " + type + "<br>" +
     names + "<br>" +
    "Price: " + currencySymbol + price + "<br>" +
    notesText + "<br>" +
    "The following is the list of services and their prices:<br><br>" + 
    fullServices + "<br>"; //key + ": " + currencySymbol + orderPrices[key] + "<br>";
  

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
  if (emailSarah){
    MailApp.sendEmail({
    to: "blankscribbles@gmail.com",
    subject: subject,
    htmlBody: body,
    replyTo: "mqphobgcc@gmail.com"
  });
  }

  //add sarah email, if bald buttons, paracords, or ergo triggers involved. include amount owed to sarah.
  var taskListId = 'Ymw5U2tVbFJhbVdRRXNWdg';


  // Task details with title and notes for inserting new task
  type = type.toString().replace(/[\-\$\d]/g, "");
  let task = {
    title: name + " - " + type + " " + " - " + timeDue + " - $" + sumPrices,
    notes: "Mods: " + names + "\n" +
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






