const csv = require("csv-parser");
const fs = require("fs");
let results =[]
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
            Amount: parseFloat(item["Amount"]),
          };
          credits.push(obj);
        }
        if (item["Credit or Debit"] === "Debit") {
          let obj = {
            Description: item["Description"],
            Amount: parseFloat(item["Amount"]),
          };
          debits.push(obj);
        }
      });
      callback(credits, debits);
      // console.log( credits, debits)
    });
}
//return results from formObjects()
function callback(creditInput, debitInput) {
  sortCredits(creditInput);
  sumOtherDebits(debitInput);
  findGroceryBills(debitInput)
  findInsuranceTotal(debitInput)
  findAmazonTotal(debitInput)
  findMcdonaldsTotal(debitInput)
  findSteamTotal(debitInput)
  findHelloFreshTotal(debitInput)

}

function sortCredits(credits) {
  let payrollArray = [];
  for(let i = 0; i < credits.length; i++){
    payrollArray.push(credits[i].Amount)
  }
  let creditTotal = payrollArray.reduce((acc, curr) => acc + curr, 0)

  console.log("Total gained in credits: ", creditTotal);

}
//Total all misc expenses
function sumOtherDebits(debits) {
  let otherDebitsArray = [];
  for(let i = 0; i < debits.length; i++){
    otherDebitsArray.push(debits[i].Amount)
  }
  let debitTotal = otherDebitsArray.reduce((acc, curr) => acc + curr, 0)
  console.log("Total Spent on other purchases: ", debitTotal);
  
}
function findGroceryBills(debits){
  let groceryArray = [];
  for(let i = 0; i < debits.length; i++){
    let description = debits[i].Description;
    //change value in includes to find something specific ie "MCDONALDS, WALMART" or however it appears on your statement
    if(description.includes("CARMEN")){
      groceryArray.push(debits[i].Amount)
    }
}
let groceryTotal = groceryArray.reduce((acc, curr) => acc + curr, 0)
console.log("Grocery Total: ", groceryTotal)

}
function findInsuranceTotal(debits){
  let groceryArray = [];
  for(let i = 0; i < debits.length; i++){
    let description = debits[i].Description;
    //change value in includes to find something specific ie "MCDONALDS, WALMART" or however it appears on your statement
    if(description.includes("ALLSTATE")){
      groceryArray.push(debits[i].Amount)
    }
    if(description.includes("STATE FARM")){
      groceryArray.push(debits[i].Amount)
    }
}
let groceryTotal = groceryArray.reduce((acc, curr) => acc + curr, 0)
console.log("Insurance Total: ", groceryTotal)
}

function findAmazonTotal(debits){
  let groceryArray = [];
  for(let i = 0; i < debits.length; i++){
    let description = debits[i].Description;
    //change value in includes to find something specific ie "MCDONALDS, WALMART" or however it appears on your statement
    if(description.includes("AMAZON")){
      groceryArray.push(debits[i].Amount)
    }
  
}
let groceryTotal = groceryArray.reduce((acc, curr) => acc + curr, 0)
console.log("Amazon Total: ", groceryTotal)
}

function findMcdonaldsTotal(debits){
  let groceryArray = [];
  for(let i = 0; i < debits.length; i++){
    let description = debits[i].Description;
    //change value in includes to find something specific ie "MCDONALDS, WALMART" or however it appears on your statement
    if(description.includes("MCDONALDS")){
      groceryArray.push(debits[i].Amount)
    }
  
}
let groceryTotal = groceryArray.reduce((acc, curr) => acc + curr, 0)
console.log("Mcdonalds Total: ", groceryTotal)
}
function findSteamTotal(debits){
  let groceryArray = [];
  for(let i = 0; i < debits.length; i++){
    let description = debits[i].Description;
    //change value in includes to find something specific ie "MCDONALDS, WALMART" or however it appears on your statement
    if(description.includes("STEAM")){
      groceryArray.push(debits[i].Amount)
    }
  
}
let groceryTotal = groceryArray.reduce((acc, curr) => acc + curr, 0)
console.log("Steam Total: ", groceryTotal)
}

function findHelloFreshTotal(debits){
  let groceryArray = [];
  for(let i = 0; i < debits.length; i++){
    let description = debits[i].Description;
    //change value in includes to find something specific ie "MCDONALDS, WALMART" or however it appears on your statement
    if(description.includes("HELLOFRESH")){
      groceryArray.push(debits[i].Amount)
    }
  
}
let groceryTotal = groceryArray.reduce((acc, curr) => acc + curr, 0)
console.log("hellofresh Total: ", groceryTotal)
}







formObjects("csv/one-year-statement.csv", callback);
