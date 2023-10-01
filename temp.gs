function myFunction() {

    var modsValues = {
    timeDue: formValues[16], // time due
    name: formValues[1], // name
    discord: formValues[2], // discord
    type: formValues[4], // type of service
    mods: formValues[6] + formValues[7] + formValues[9] + formValues[10] + formValues[13], // mods from repairs, mobo, install, full build
    triggers: formValues[8] + formValues[11]  + formValues [14], // triggers from ^
    notes: formValues[5] + formValues[6] + formValues[12] + formValues[15] + formValues[17], // repair, shell, contact, details will seperate 
    email: formValues[3] // email
  };

  const modsSheet = e.source.getSheetByName("Mods");
  const modsRange = modsSheet.getRange(row, 1, 1, modsValues.length);
  modsValues[6] = modsSheet.getRange("G"+row).getFormula();
  modsRange.setValues([modsValues]);
  SpreadsheetApp.flush();

  var sheet = e.source.getSheetByName("Mods");
  
  // get the last row that has data
  var lastRow = row;

  // get the values from the last row
  var values = sheet.getRange(lastRow, 2, 1, 8).getValues()[0];
  // extract the values from the row
  var names = values[0];
  var contact = values[1];
  var type = values[2];
  var adds = values[3]; // mods
  var trigger = values[4];
  var price = values[5];
  var notes = values[6];
  var email = values[7];
  // replace - and $ to work with formula in main sheet
  var adds = adds.replace(/[\-\$\d]/g, "");
  // details for customers that I remove to work with mods list in main sheet
  adds = adds.replace("FF Notches (left, top, right)", "FF Notches");
  adds = adds.replace("Standard (black, indigo, orange)", "Standard");
  // similar idea
  var temp = type == "Repair Job or Mods" ? "" : type.replace(/\(same day of tournament\)/g, '').replace(/\$|\d+/g, '');
  Logger.log(adds.length);
  if (temp.length !== 0){
    adds = adds.length === 1 ? temp : adds += ", " + temp;
  }
  
  Logger.log(adds);
  Logger.log(type);
  // get the mod prices
  var mod_prices = {};
  var mod_column = (type === "Custom Order") ? 11 : 12; // column K or L
  var mod_values = sheet.getRange("J:J").getValues();
  for (var i = 0; i < adds.split(",").length; i++) {
    var add = adds.split(",")[i].trim();
    for (var j = 0; j < mod_values.length; j++) {
      //Logger.log(add);
      //Logger.log(mod_values[j])
      // special case where form sheet and mo
      add = add === "FF Notches" ? "FF Notches (left, top, right)" : add;
      add = add === "Standard" ? "Standard (black, indigo, orange)" : add;
      if (mod_values[j][0] == add) {
        mod_prices[add] = sheet.getRange(j + 1, mod_column).getValue();
        break;
      }
    }
  }
  var timeDue = modsValues[0];
  // create the email 
  var subject = "MQ - Phob - " + names + " - " + type;
  subject = type === "Custom Order" ? subject : subject +=" - Time Due: " + timeDue
  var body = "Dear " + names + ",<br><br>" +
             "Thank you for submitting your order. Here are the details of your order:<br><br>" +
             "Contact: " + contact + "<br>" +
             "Order type: " + type + "<br>" +
             "Mods: " + adds + "<br>" +
             "Triggers: " + trigger + "<br>" +
             "Price: $" + price + "<br>" +
             "Notes: " + notes + "<br><br>" +
             "The following is the list of mods and their prices:<br><br>";
  for (var key in mod_prices) {
    if (key === "FF Notches"){
      body += key + "(left, top, right): " + mod_prices[key] + "$<br>";
    } else {
      body += key + ": " + mod_prices[key] + "$<br>";
    }
    
  }
  Logger.log(mod_prices);
  if (type === "Custom Order"){
  body += "<br>Thank you for choosing MQ Mods!<br><br>" +
          "Best regards,<br>" +
          "MQ<br><br>" +
          "Discord: MQDiscord#0211<br>" +
          "Twitter: <a href='https://twitter.com/MQMods'>twitter.com/MQMods</a><br>" +
          "Email: <a href='mailto:mqphobgcc@gmail.com'>mqphobgcc@gmail.com</a><br>" +
          "Phob Resource: <a href='https://phobg.cc'>phobg.cc</a><br>" +
          "<img src='https://pbs.twimg.com/profile_images/1660798463347392513/AeOFyWxC_400x400.jpg'>";
  } else { 
    body += "<br>Thank you for choosing MQ Mods!<br><br>" +
          "Best regards,<br>" +
          "MQ<br><br>" +
          "Phone Number: 6476914659<br>" + 
          "Discord: MQDiscord#0211<br>" +
          "Twitter: <a href='https://twitter.com/MQMods'>twitter.com/MQMods</a><br>" +
          "Email: <a href='mailto:mqphobgcc@gmail.com'>mqphobgcc@gmail.com</a><br>" +
          "Phob Resource: <a href='https://phobg.cc'>phobg.cc</a><br>" +
          "<img src='https://pbs.twimg.com/profile_images/1660798463347392513/AeOFyWxC_400x400.jpg'>";
  }
  
Logger.log("Subject: " + subject);
Logger.log("Body: " + body);
 MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body,
    replyTo: "mqphobgcc@gmail.com"
  });
   MailApp.sendEmail({
    to: "mqphobgcc@gmail.com",
    subject: subject,
    htmlBody: body,
    replyTo: "mqphobgcc@gmail.com"
  });

  var taskListId = 'Ymw5U2tVbFJhbVdRRXNWdg';
  

  // Task details with title and notes for inserting new task
  type = type.toString().replace(/[\-\$\d]/g, "");
  let task = {
    title: names + " - " + type + " " + " - " + timeDue + " - $" + price,
    notes: "Mods: " + adds + "\n" +
             "Triggers: " + trigger + "\n" +
             "Price: $" + price + "\n" +
             "Notes: " + notes
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

  if (type === "Custom Order"){
  body += "<br>Thank you for choosing MQ Mods!<br><br>" +
        "Best regards,<br>" +
        "MQ<br><br>" +
        "Discord: MQDiscord#0211<br>" +
        "Twitter: <a href='https://twitter.com/MQMods'>twitter.com/MQMods</a><br>" +
        "Email: <a href='mailto:mqphobgcc@gmail.com'>mqphobgcc@gmail.com</a><br>" +
        "Phob Resource: <a href='https://phobg.cc'>phobg.cc</a><br>" +
        "<img src='https://pbs.twimg.com/profile_images/1660798463347392513/AeOFyWxC_400x400.jpg'>";
  } else { 
  }
}

function getPrice(modsList, region) { 
  var orderPrices = {};
  var repairText = '';
  var modText = '';
  modsList.forEach(function(service, index) {
    Logger.log("The value at psn " + index + " is " + service + ".");
    service.forEach(function(mod, modIndex){
      Logger.log("The value at s " + modIndex + " is " + mod + ".");
      if (mod in priceDict) {
        Logger.log(priceDict[mod][region])
        orderPrices[mod] = priceDict[mod][region]
        if (service === repair) {
          repairText += mod + ': ' + currencySymbol + orderPrices[mod] + ', ';
        } else if (service === mods) {
          modText += mod + ': ' + currencySymbol + orderPrices[mod] + ', ';
        }
      };
    });
  });
  return [orderPrices, repairText, modText];
}
