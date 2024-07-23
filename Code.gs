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
  //var stickboxRepairItem = populateMod(sheet, stickboxrepair);


  /*Logger.log(stickboxRepairItem.typeInfo);
  stickboxRepairItem.mods.forEach((modinType) => {
    Logger.log("stickboxrepair: " + modinType.modInfo)
  });
  formPopulator(stickboxRepairItem, stickboxrepair);
  */
  var stickbox = 'Stickbox';
  //var stickboxItem = populateMod(sheet, stickbox);
  /*stickboxItem.mods.forEach((modinType) => {
    //Logger.log("stickbox: " + modinType.modInfo)
  });
  */
  //formPopulator(stickboxItem, stickbox);

  var triggerrepair = 'Trigger Repair';
  //var triggerRepairItem = populateMod(sheet, triggerrepair);

  //formPopulator(triggerRepairItem, triggerrepair);

  var cablerepair = 'Cable Repair';
  //var cableRepairItem = populateMod(sheet, cablerepair);

  //formPopulator(cableRepairItem, cablerepair);

  var oem = 'OEM';
  //var oemItem = populateMod(sheet, oem);

  //formPopulator(oemItem, oem);


  var customstickbox = 'Custom Stickbox';
  //var customstickboxItem = populateMod(sheet, customstickbox);

  //formPopulator(customstickboxItem, customstickbox);

  var magnet = 'Stickbox Magnet';
  //var magnetItem = populateMod(sheet, magnet);

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

  //Logger.log(e.namedValues); 
  //Logger.log(e.namedValues["Stickbox [Lubrication]"]);
  //Logger.log(e.namedValues["Custom Stickbox [Factory New Tightness]"]);

  //const formSheet = e.range.getSheet();
  //const formName = formSheet.getSheetName();
  const formDict = e.namedValues;
  /*const formDict = {
    "Stickbox [Replacement]": ["C Stick"],
    "Shell [Standard (black, indigo, orange)]": [],
    "Stickbox [Lubrication]": ["Grey Stick, C Stick"],
    "Shell [Custom Shell]": [],
    "Please describe the problem and/or choose the repair below": [],
    "Shipping Address, Name, and anything else you think I need to know.": ["repair"],
    "Stickbox Magnet [D12]": [],
    "Custom Stickbox [Worn in]": [],
    "Custom Stickbox [Factory New Tightness]": [],
    "Service": ["Repair Job or Mods"],
    "Tag": ["repair"],
    "Buttons": ["Tactile Z, Bald Buttons"],
    "Character Main": [],
    "Stickbox Magnet [N30H]": [],
    "Stickbox Repair [Snapback Capacitor]": [],
    "Discord": ["repair"],
    "Stickbox Magnet [DH1H1]": [],
    "Cable": [],
    "Timestamp": ["6/10/2024 14:27:06"],
    "Triggers [Half Plug]": [],
    "Triggers [Full Plug]": [],
    "Triggers [Mouseclick]": ["Left"],
    "Time Due": ["Priority"],
    "Stickbox Repair [Snapback Module]": ["C Stick"],
    "Notches": ["Wavedash Notches"],
    "Triggers [Ergo Trigger]": ["Left, Right"],
    "Triggers [Low Force]": [],
    "Stickbox Repair [Potentiometer Replacement]": ["Grey Stick"],
    "Commission idea (custom paint job) or shell name or any other details. Will contact.": [],
    "Stickbox [Wavespring]": [],
    "OEM": [],
    "Trigger Repair [Trigger Pot Replacement]": ["Left"],
    "Stickbox [Slickbox]": [],
    "Shell [Mario]": [],
    "Shell [White or Emerald]": [],
    "Email": ["mqjksify@hotmail.com"],
    "Cable Repair": ["OEM 3 Metres"],
    "Custom Stickbox [Tight]": []
};*/


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
  var regionName = formDict["Region"][0];
  Logger.log(regionName);
  var priceIndex = 0; //NAPrice
  var currencySymbol = "$";
  var region = 0;
  if (regionName === "EU") {
    region = 2; //EUPrice
    currencySymbol = "€"; 
  }

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
          userType[modType] = populateMod(sheet, modType, region, modName, modKey);
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
            userType[key] = populateMod(sheet, key, region, m);
            
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

  
  

 
  


  //populate dict with customer order: prices
  var orderPrices = {};
  var Sarah = ["Bald Buttons", "Ergo Triggers", "Paracord 2 Metres", "Paracord 3 Metres"];
  var emailSarah = false;
  var price = 0;
  var fullServices = '';
  var modsList = [];
  for (let key in userType) {
    if (userType.hasOwnProperty(key)) {
      for (const m of userType[key].mods) {
        
        
        if (Sarah.includes(m.name)){
          emailSarah = true;
        }
      }
      price += userType[key].price(type);
      //Logger.log("TEST: " + userType[key].prettyType);
      if (userType[key].modsName.length > 0) {
        modsList.push(userType[key].modsName);
        fullServices += userType[key].prettyType;
      }
      //Logger.log(fullServices);
    }
}

  var names = modsList.flat().join(', ');

  //make function that sums the values in a dict
  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
  const sumPrices = sumValues(orderPrices);

  //seperating notes into categories
  var notes = { "Problem": problem, "Custom Shell": customShell, "Additional Contact / Shipping": prsn.shipping };
  var notesText = '';
  var notesTextTasks = '';
  Object.keys(notes).forEach(function (note) {
    if (notes[note]) {
      notesText += note + ': ' + notes[note] + "<br>";
      notesTextTasks += note + ': ' + notes[note] + "\n";
    };
  });
  if (prsn.discord === '') {
    prsn.discord = prsn.email;
  }
  // create the email 
  var subject = "MQ - " + prsn.name + " - " + type + " - " + timeDue + " Queue ";
  //subject = type === "Custom Order" ? subject : subject +=" - Queue - " + timeDue;
  var body = "Dear " + prsn.name + ",<br><br>" +
    "Thank you for submitting your order. I will be contacting you within the next 2-3 days. Please feel free to contact me before that if you have any questions. Contact information below! Unless you selected priority queue or have a custom commission, this should be the final price. Here are the details of your order:<br><br>" +
    "Contact: " + prsn.discord + "<br>" +
    "Order type: " + type + "<br>" +
     "Products: " + names + "<br>" +
    "Price(CAD): " + currencySymbol + price + "<br>" +
    "Price(USD): " + currencySymbol + price*0.76 + "<br>" +
    notesText + "<br>" +
    "The following is the list of services and their prices:<br><br>" + 
    fullServices + "<br>"; //key + ": " + currencySymbol + orderPrices[key] + "<br>";
  

  body += "<br>Thank you for choosing MQ Mods!<br><br>" +
    "Best regards,<br>" +
    "MQ<br><br>" +
    "Discord: MQMods<br>" +
    "Twitter: <a href='https://twitter.com/MQMods'>twitter.com/MQMods</a><br>" +
    "Email: <a href='mailto:mqphobgcc@gmail.com'>mqphobgcc@gmail.com</a><br>" +
    "Phob Resource: <a href='https://phobg.cc'>phobg.cc</a><br>" +
    "<img src='https://pbs.twimg.com/profile_images/1660798463347392513/AeOFyWxC_400x400.jpg'>";

  //Logger.log("Subject: " + subject);
  //Logger.log("Body: " + body);
  if (emailSarah){
    MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body,
    replyTo: "mqphobgcc@gmail.com",
    bcc: "sarahtsuipaysrent@gmail.com"
  }) } else {
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
  }
  
  //add sarah email, if bald buttons, paracords, or ergo triggers involved. include amount owed to sarah.
  var taskListId = 'Ymw5U2tVbFJhbVdRRXNWdg';


  // Task details with title and notes for inserting new task
  type = type.toString().replace(/[\-\$\d]/g, "");
  let taskServices = fullServices.replace(/<br>/g, '\n');
  taskServices = taskServices.replace(/<[^>]*>/g, '');
  taskServices = taskServices.replace(/&nbsp;/g, ' ');
  let task = {
    title: name + " - " + type + " " + " - " + timeDue + " - $" + price,
    notes: "Mods: " + names + "\n" +
      "Price: " + currencySymbol + price + "\n" +
      notesTextTasks + "\n" + taskServices
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






