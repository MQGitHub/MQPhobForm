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
