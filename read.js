const csv = require("csv-parser");
const fs = require("fs");

//RESULTS is to total read in CSV data
const results = [];

//pushed in from forEach below
let credits = [];
let debits = [];

//read csv, seperate debits and credits, turn into objects and push to arrays.
function formObjects(file, callback) {
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
      callback(credits, debits);
    });
}

function callback(creditInput, debitInput) {
  sortCredits(creditInput);
  sumGoPuff(debitInput);
  sumUberRides(debitInput);
  sumOtherDebits(debitInput);
}
function sumOtherDebits(debits) {
  let otherDebitsArray = [];
  for (let i = 0; i < debits.length; i++) {
    let initialDescription = toString(debits[i]);
    if (
      !initialDescription.includes("UBER") &&
      !initialDescription.includes("GOPUFF")
    ) {
      for (let j = 1; j < debits.length; j++) {
        if (toString(debits[j]).includes(initialDescription)) {
          otherDebitsArray.push(debits[j]);
        }
      }
    }
  }
  var otherDebitsTotal = otherDebitsArray.reduce(function (
    previousValue,
    currentValue
  ) {
    return {
      Amount: previousValue.Amount + currentValue.Amount,
    };
  });
  console.log("Total Spent on other purchases: ");
  console.log(otherDebitsTotal);
}
function sumUberRides(debits) {
  let otherDebitsArray = [];
  for (let i = 0; i < debits.length; i++) {
    let initialDescription = toString(debits[i]);
    if (initialDescription.includes("UBER")) {
      for (let j = 1; j < debits.length; j++) {
        if (toString(debits[j]).includes(initialDescription)) {
          otherDebitsArray.push(debits[j]);
        }
      }
    }
  }
  var uberTotal = otherDebitsArray.reduce(function (
    previousValue,
    currentValue
  ) {
    return {
      Amount: previousValue.Amount + currentValue.Amount,
    };
  });
  console.log("Total Spent on Uber: ");
  console.log(uberTotal);
}

function sumGoPuff(debits) {
  let goPuffArray = [];
  for (let i = 0; i < debits.length; i++) {
    let initialDescription = toString(debits[i]);
    if (initialDescription.includes("GOPUFF")) {
      for (let j = 1; j < debits.length; j++) {
        if (toString(debits[j]).includes(initialDescription)) {
          goPuffArray.push(debits[j]);
        }
      }
    }
  }
  var goPuffTotal = goPuffArray.reduce(function (previousValue, currentValue) {
    return {
      Amount: previousValue.Amount + currentValue.Amount,
    };
  });
  console.log("Total Spent on goPuff: ");
  console.log(goPuffTotal);
}

function sortCredits(credits) {
  let payrollArray = [];
  for (let i = 0; i < credits.length; i++) {
    let initialDescription = toString(credits[i]);
    if (initialDescription.includes("GOBRANDS")) {
      for (let j = 1; j < credits.length; j++) {
        if (toString(credits[j]).includes(initialDescription)) {
          payrollArray.push(credits[j]);
        }
      }
    }
  }
  var payrollTotal = payrollArray.reduce(function (
    previousValue,
    currentValue
  ) {
    return {
      Amount: previousValue.Amount + currentValue.Amount,
    };
  });
  console.log("Total gained in payroll: ");
  console.log(payrollTotal);
}

function toString(obj) {
  return JSON.stringify(obj.Description);
}
// SORT CHECKS
//start at first check and get description, check if next description contains same string else move to next.

// let creditTotal = 0; // Variable to hold your total
// for (let i = 0; i < credits.length; i++) {
//   creditTotal += credits[i].Amount;
// }
// let debitTotal = 0;
// for (let i = 0; i < debits.length; i++) {
//   debitTotal += debits[i].Amount;
// }
// let savedOrLost = creditTotal - debitTotal;
// console.log("Credit total: " + creditTotal);
// console.log("Debit total: " + debitTotal);
// if (savedOrLost > 0) {
//   console.log("you saved: " + savedOrLost + " this month.");
// }
// if (savedOrLost < 0) {
//   console.log("you lost: " + savedOrLost + " this month.");
// }

formObjects("august.csv", callback);
