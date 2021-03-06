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
//return results from formObjects()
function callback(creditInput, debitInput) {
  sortCredits(creditInput);
  sumGoPuff(debitInput);
  sumUberRides(debitInput);
  sumOtherDebits(debitInput);
}

//Total all misc expenses
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

//total uber expense
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

//total total spent on gopuff
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
//total credits to account
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
//turns the object description key:value to a string to use includes() above
function toString(obj) {
  return JSON.stringify(obj.Description);
}

formObjects("csv/august.csv", callback);
