
function sendtext(e) {
  
  Logger.log(e.namedValues);  

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

  //const repairSheet = e.source.getSheetByName('Repairs')
  const formSheet = e.range.getSheet();
  const formName = formSheet.getSheetName();
  const formDict = e.namedValues;

  //pull variables from form
  var type = formDict["Type of Service"][0];
  var name = formDict["Tag"][0];
  var email = formDict["Email"][0];
  var timeDue = formDict["Time Due"][0];
  var contact = formDict["Discord"][0];
  var customShell = formDict["Custom Shell"][0];
  var contactInfo = formDict["Contact Information"][0];
  var problem = formDict["Please describe the problem and/or choose the repair below"][0];

  const userDict = {};
  /*
  populate userDict = {mod: [], mod: [left trigger, right trigger]}
  loops through form values
  */
  for (const key in formDict) {
    var modKey = formDict[key];
    //if mod is not selected
    if (!modKey[0]) {
      continue;
    };
    var modsSplit = modKey[0].split(", ") // some mods are in Mod Type['mod1, mod2'] format
    const regex = /\[(.*?)\]/g; // Regular expression to match modType [modName]
    const matches = key.match(regex);

    if (matches) { 
      const modName = matches.map(match => match.replace(/\[|\]/g, '')); // Remove square brackets and place in array
      if (modName[0] == '3 Metres' || modName[0] == '2 Metres'){ //cables are price dependent on both axis
        if (modKey == 'OEM White') {
          userDict[modKey] = [];
        } else {
          userDict[modKey + " " + modName[0]] = [];
        };
      } else {
        userDict[modName[0]] = modKey;
      };
    } else { //when mod is not in grid format
      for (const key of modsSplit) {
        userDict[key] = [];
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
  //var priceSectionNames = [mods, shell, repair];
  var repairText = '';
  const priceDict = {}
  const textDict = {}

  // create price list dict from Price List sheet
  // populate each mod type with prices
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

  

  //make function that sums the values in a dict
  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
  const sumPrices = sumValues(orderPrices);

  //seperating notes into categories
  var notes = {"Problem": problem, "Custom Shell": customShell, "Additional Contact / Shipping": contactInfo};
  var notesText = '';
  var notesTextTasks = '';
  Object.keys(notes).forEach(function(note) {
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
  var subject = "MQ - " + name + " - " + type +" - Queue - " + timeDue;
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

  let url = "https://docs.google.com/forms/d/e/1FAIpQLSfzcYJkGcVAp3KtK8lqHW4fNnlIAo1KlJhvjFLjBENU5oRgfg/formResponse?usp=pp_url&entry.1776723881=EU&entry.1788271175=eu%230000&entry.1889895950=eu@email.com&entry.1372832015=Full+Phob+Controller&entry.2092809051=White+or+Emerald&entry.685834931=FF+Notches+(left,+top,+right)&entry.685834931=Bottom+Notch&entry.685834931=Mouseclick+ABXY&entry.685834931=Mouseclick+L&entry.685834931=Low+Force+Triggers&entry.2067569380=Half+L&entry.2067569380=Full+R&entry.2079650081=contact&entry.1200455697=7+PM";
 
  let response = UrlFetchApp.fetch(url);

}

function getPrice(modsList, region) { 
  
}




