const csv = require("csv-parser");
const fs = require("fs");

//RESULTS is to total read in CSV data
const results = [];

//pushed in from forEach below
let credits = [];
let debits = [];

function calc(file) {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results.forEach((item) => {
        //these arrays will be an array of strings until parsed
        if (item["Credit or Debit"] === "Credit") {
          credits.push(parseInt(item["Amount"]));
        }
        if (item["Credit or Debit"] === "Debit") {
          debits.push(parseInt(item["Amount"]));
        }
      });
      console.log(debits);
      console.log(credits);
      let creditTotal = 0; // Variable to hold your total

      for (let i = 0; i < credits.length; i++) {
        creditTotal += credits[i];
      }

      let debitTotal = 0;

      for (let i = 0; i < debits.length; i++) {
        debitTotal += debits[i];
      }
      let savedOrLost = creditTotal - debitTotal;
      if (savedOrLost > 0) {
        console.log("you saved: " + savedOrLost + " this month.");
      }
      if (savedOrLost < 0) {
        console.log("you lost: " + savedOrLost + " this month.");
      }
    });
}
calc("./csv/sofar.csv");
