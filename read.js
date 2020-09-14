const csv = require("csv-parser");
const fs = require("fs");

//RESULTS is to total read in CSV data
const results = [];

//pushed in from forEach below
let credits = [];
let debits = [];

//read csv, seperate debits and credits, turn into objects and push to arrays.
function formObjects(file) {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results.forEach((item) => {
        //these arrays will be an array of strings until parsed
        if (item["Credit or Debit"] === "Credit") {
          let obj = {
            Description: item["Description"],
            Amount: parseInt(item["Amount"]),
          };
          credits.push(obj);
        }
        if (item["Credit or Debit"] === "Debit") {
          let obj = {
            Description: item["Description"],
            Amount: parseInt(item["Amount"]),
          };
          debits.push(obj);
        }
      });
      //return debits <--- returns undefined
    });
  return debits;
}
let pug = formObjects("august.csv");
console.log(pug);
// function calculateLoss() {
//   console.log(formObjects(file));
//   // let creditTotal = 0; // Variable to hold your total

//   // for (let i = 0; i < credits.length; i++) {
//   //   creditTotal += credits[i].Amount;
//   // }

//   // let debitTotal = 0;

//   // for (let i = 0; i < debits.length; i++) {
//   //   debitTotal += debits[i].Amount;
//   // }
//   // let savedOrLost = creditTotal - debitTotal;
//   // if (savedOrLost > 0) {
//   //   console.log("you saved: " + savedOrLost + " this month.");
//   // }
//   // if (savedOrLost < 0) {
//   //   console.log("you lost: " + savedOrLost + " this month.");
//   // }
// }
// calculateLoss();
