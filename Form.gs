// Create a new form, then add a checkbox question, a multiple choice question,
// a page break, then a date question and a grid of questions.

//Clear form for when form is complete and want to update
function clearForm(form){
  var items = form.getItems();
  while(items.length > 0){
    form.deleteItem(items.pop());
  }
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

  var shellPage = form.addPageBreakItem().setTitle('Shell');
  var shellMCItem = form.addCheckboxGridItem();
  var customshellItem = form.addTextItem();

  var repairPage = form.addPageBreakItem().setTitle('Repairs');

  var problemItem = form.addParagraphTextItem();
  var stickboxRepairItem = form.addCheckboxGridItem();
  var triggerRepairItem = form.addCheckboxGridItem();
  var cableRepairItem = form.addCheckboxGridItem();

  var customorderPage = form.addPageBreakItem().setTitle('Custom Orders');

  var oemItem = form.addMultipleChoiceItem();
  var characterItem = form.addTextItem();
  var customstickboxItem = form.addMultipleChoiceItem();
  var magnetItem = form.addCheckboxItem();

  var modPage = form.addPageBreakItem().setTitle('Mods');

  var notchItem = form.addCheckboxItem();
  var buttonItem = form.addCheckboxItem();
  var stickboxItem = form.addCheckboxGridItem();
  var triggerItem = form.addCheckboxGridItem();
  var cableItem = form.addCheckboxGridItem();


  var submitPage = form.addPageBreakItem().setTitle('Contact Information and Time Due');
  var shippingItem = form.addParagraphTextItem();
  var timedueItem = form.addListItem();

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
