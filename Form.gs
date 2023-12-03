// Create a new form, then add a checkbox question, a multiple choice question,
// a page break, then a date question and a grid of questions.

//Clear form for when form is complete and want to update

var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1lQ6CJU3yoyuayNaS4AFGL4p1FFjEacyk8G2KmqOvKzk/edit#gid=0")

function clearForm(form){
  var items = form.getItems();
  while(items.length > 0){
    form.deleteItem(items.pop());
  }
}

function formPopulator(mod, name) {
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1lQ6CJU3yoyuayNaS4AFGL4p1FFjEacyk8G2KmqOvKzk/edit#gid=0")
  var modSheet = populateMod(sheet, name);
  if (modSheet.description){
    mod.setHelpText(modSheet.description);
  }
  if (!modSheet.symmetry) {
    Logger.log(modSheet.typeInfo);
    mod.setChoiceValues(modSheet.modsName);
  } else {
    mod.setRows(modSheet.modsName);
    mod.setColumns(modSheet.symmetry);
  }
  mod.setTitle(name);

  
}
//Create form
function createForm(){
  var form = FormApp.create('MQ Phob Order Form');
  //var form = FormApp.openById('10z-wIuPY6RPdxwzXiqd0oKeDfEiQny7Wz6Pj5U6gOuk');
  //clearForm(form);
  form.setDescription("Form for Phob orders, repairs, and mods. Once completed, you will get an email with your order information. Give me 2 days to contact you on discord or by email, please contact me if I have not reached out to you by then :)");

  //Setup initial page
  var tagItem = form.addTextItem().setTitle('Tag');
  tagItem.setRequired(true);

  var discordItem = form.addTextItem().setTitle('Discord');
  discordItem.setHelpText("For contacting when controller is ready. If you don't have discord or prefer email, leave blank.")

  var emailItem = form.addTextItem().setTitle('Email');
  emailItem.setHelpText('Sends an order breakdown to the email provided. Look for an email from mqphobgcc@gmail.com');
  emailItem.setRequired(true);

  var servicetypeItem = form.addListItem().setTitle('Type of Service');
  servicetypeItem.setHelpText('Custom order is not recommended for most players! Use custom order only if you are seeking further customization and the highest quality parts, or OEM builds. The service level is the same for all types of orders, the only difference is custom orders will use exceptional OEMs with the best internals.')
  servicetypeItem.setRequired(true);

  //Service Choices
  var shellChoice = servicetypeItem.createChoice('Full Phob Controller', shellPage);
  var modChoice = servicetypeItem.createChoice('Motherboard', modPage);
  var installChoice = servicetypeItem.createChoice('Install', modPage);
  var repairChoice = servicetypeItem.createChoice('Repair Job or Mods', repairPage);
  var customorderChoice = servicetypeItem.createChoice('Custom Order', customorderPage);
  servicetypeItem.setChoices([shellChoice, modChoice, installChoice, repairChoice, customorderChoice]);

  //Create pages

  var shell = 'Shell'
  var shellPage = form.addPageBreakItem().setTitle(shell);
  var shellMCItem = form.addCheckboxGridItem();
  shellMCItem.setRequired(true);
  var customshellItem = form.addTextItem();
  customshellItem.setTitle('Commission idea (custom paint job) or shell name or any other details. Will contact.');
  formPopulator(shellMCItem, shell);

  var repairPage = form.addPageBreakItem().setTitle('Repairs');

  var problemItem = form.addParagraphTextItem();
  problemItem.setTitle('Please describe the problem and/or choose the repair below')
  //problemItem.setHelpText('Please describe the problem and/or choose the repair below');

  var stickboxRepairItem = form.addCheckboxGridItem();
  var stickboxrepair = 'Stickbox Repair';
  formPopulator(stickboxRepairItem, stickboxrepair);

  var triggerRepairItem = form.addCheckboxGridItem();
  var triggerrepair = 'Trigger Repair';
  formPopulator(triggerRepairItem, triggerrepair);

  var cableRepairItem = form.addCheckboxItem();
  var cablerepair = 'Cable Repair';
  formPopulator(cableRepairItem, cablerepair);

  var customorderPage = form.addPageBreakItem().setTitle('Custom Orders');
  customorderPage.setHelpText('Almost exclusively mint JP whites shells and internals. Stickboxes depend on customer preference.');

  var oemItem = form.addMultipleChoiceItem();
  var oem = 'OEM';
  formPopulator(oemItem, oem);

  var characterItem = form.addTextItem();
  characterItem.setTitle('Character Main');
  characterItem.setHelpText('Will use for calibration purposes and suggestions');

  var customstickboxItem = form.addCheckboxGridItem();
  var customstickbox = 'Custom Stickbox';
  formPopulator(customstickboxItem, customstickbox);

  var magnetItem = form.addCheckboxGridItem();
  var magnet = 'Stickbox Magnet'
  formPopulator(magnetItem, magnet);

  var modPage = form.addPageBreakItem().setTitle('Mods');

  var notchItem = form.addCheckboxItem();
  var notch = 'Notches';
  formPopulator(notchItem, notch);

  var buttonItem = form.addCheckboxItem();
  var button = 'Buttons';
  formPopulator(buttonItem, button);

  var stickboxItem = form.addCheckboxGridItem();
  var stickbox = 'Stickbox';
  formPopulator(stickboxItem, stickbox);

  var triggerItem = form.addCheckboxGridItem();
  var trigger = 'Triggers';
  formPopulator(triggerItem, trigger);

  var cableItem = form.addCheckboxItem();
  var cable = 'Cable';
  formPopulator(cableItem, cable);


  var submitPage = form.addPageBreakItem().setTitle('Contact Information and Time Due');
  var shippingItem = form.addParagraphTextItem();
  shippingItem.setTitle('Shipping Address, Name, and anything else you think I need to know.')
  shippingItem.setRequired(true);
  var timedueItem = form.addListItem();
  timedueItem.setTitle('Time Due');
  timedueItem.setHelpText('When you will need the controller. 2-3 Weeks lead time per order. For priority orders the extra cost is calculated by 5 * queue count, so if there are 3 orders in queue, you pay $15. I will contact you ASAP with how much the additional cost is.')
  timedueItem.setChoiceValues(['Regular, Priority']);
  timedueItem.setRequired(true);

  //Set where page goes to once completed (sets where previous page goes to, very stupid imo)
  repairPage.setGoToPage(modPage); //shell before
  customorderPage.setGoToPage(modPage); //repair before
  modPage.setGoToPage(modPage); // custom order before
  submitPage.setGoToPage(submitPage); //modpage before

  //Set page description
  shellPage.setHelpText("Like new are new or new shells with little to no scuffs. Slightly used has some visible scuff marks. Performance is the same.");
  repairPage.setHelpText("Choose which repairs you want. Skip this section if you are only getting mods.");
  modPage.setHelpText("Choose which mods to get. Refer to image for description and prices. If you are ordering a motherboard, I will  need your shell and/or buttons for some of these mods or give you the modded part.");
  customorderPage.setHelpText("Almost exclusively mint JP whites shells and internals. Stickboxes depend on customer preference.");

  Logger.log('Published URL: ' + form.getPublishedUrl());
  Logger.log('Editor URL: ' + form.getEditUrl());
  

}
