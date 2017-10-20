//Just a simple file the intent is to move all of the scripts to external files.

////////////////////////////////////////////////////////////////////////////////
//This performs all the calculations for the speed calculations.
//Look into adding some kidn of slip estimator.
function gearratio() {
  "use strict"
  var intRPM;
  var intGears;
  var realTire;
  var realRear;
  var intDistanceInch = 12;
  var intDistanceFoot = 5280;
  var intDistanceKilometers = 1000000;
  var intTime = 60;
  var intCounter;
  var objTrannyTable;

  intGears = document.getElementById("gears").value;
  intRPM = document.getElementById("rpm").value;
  realRear = document.getElementById("gear").value;
  realTire = document.getElementById("tire").value;

//grab the trannytable then pull each individual gear ratio?
  objTrannyTable = document.getElementById("trannytable");

  intCounter = objTrannyTable.rows.length - 1;

// How do I decide if I want to update the gear ratio or the speed.
  while (intCounter > 0){
    switch (document.getElementById("MeasureSystem").value){
      case "english":
//Basic formula that takes the diameter of a wheel, determines the circumfres and finally multiplys the circumfres by the rotaion speed.  Then the rotation speed is divided by to get milaege.
        objTrannyTable.rows[(parseInt(intCounter))].cells[2].children[0].value = Math.round(intRPM / (objTrannyTable.rows[(parseInt(intCounter))].cells[1].children[0].value * realRear) * (Math.PI * realTire) /intDistanceInch/intDistanceFoot*intTime);
        intCounter = intCounter - 1;
        break;
      case "metric":
//Same formula as before but for metric calculation.  This was the best way I could come up to deal with the two different measurement systems.  Maybe I can get this down to a single linne.
        objTrannyTable.rows[(parseInt(intCounter))].cells[2].children[0].value = Math.round(intRPM / (objTrannyTable.rows[(parseInt(intCounter))].cells[1].children[0].value * realRear) * (Math.PI * realTire) /intDistanceKilometers*intTime);
        intCounter = intCounter - 1;
        break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////
//Function that generates the gear choice table.
//Currently there is an issue with how the table is generated.  New table rows
//are inserted into the table header.
function gearchoice() {
  "use strict"
  var intI;
  var intGears;
  var holder;
  var objTrannyTable;
  var gearchoice;
  var objTableRow;
  intGears = parseInt(document.getElementById("gears").value, 10) + 1;

  objTrannyTable = document.getElementById("trannytable");
  if (objTrannyTable.rows.length < intGears){
    intI = intGears - objTrannyTable.rows.length;
    while (intI > 0) {
      objTableRow = objTrannyTable.insertRow(-1);
      holder = objTableRow.insertCell(0);
      holder.innerHTML = objTableRow.rowIndex;
      holder =  objTableRow.insertCell(1);
      holder.innerHTML =  "<input type=\"number\" step=\"0.01\" onchange=\"gearratio()\">";
      holder = objTableRow.insertCell(2);
      holder.innerHTML =  "<input type=\"number\" id=\"speed\">";
      intI = intI - 1;
      }
    }
  if (objTrannyTable.rows.length > intGears){
    intI = objTrannyTable.rows.length - intGears;
    while (intI > 0){
      objTrannyTable.deleteRow(-1);
      intI = intI - 1;
    }
  }
}
///////////////////////////////////////////////////////////////////////////////
//quick and somewhat dirty function to calculate overall wheel and tire size.
function tiresizer() {
  "use strict"


  var inttirewidth = parseInt(document.getElementById("tirewidth").value);
  var tirer = document.getElementById("tirer");
  var inttireaspect = parseInt(document.getElementById("tireaspect").value)/100;
  var inttirewheel = parseInt(document.getElementById("tirewheel").value);

  document.getElementById("tireanswer").innerHTML = Math.round(((inttirewidth * inttireaspect * 2 + (inttirewheel * 25.4)) / 25.4) * 10) / 10;
}
