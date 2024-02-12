// There are n employees in a company, numbered from 0 to n - 1. Each employee i has worked for hours[i] hours in the company.

// The company requires each employee to work for at least target hours.

// You are given a 0-indexed array of non-negative integers hours of length n and a non-negative integer target.

// Return the integer denoting the number of employees who worked at least target hours.

// input hours
let inputString = prompt("Enter comma-separated numbers of hours :"); // Prompt the user to enter comma-separated numbers
let hours: number[] = [];

if (inputString) { 
    let words: string[] = inputString.split(",").filter(word => isNaN(Number(word))); 
    if (words.length > 0) {
         console.log("Error: Input should only contain numbers"); 
        } else { 
            hours = inputString.split(",").map(Number).filter(hours => hours >= 0 && Number.isInteger(hours)); 
            console.log(`Array of hours ${hours}`); 
        } 
    } else {
             console.log("No input provided"); 
         }
 
// input target
let targetInput: string | null = prompt("Enter a non-negative integer target:");
var target: any;
if (targetInput) {
 target = parseInt(targetInput);

  if (!isNaN(target) && target >= 0 && Number.isInteger(target)) {
    console.log("Target:", target);
  } else {
    console.log("Invalid input. Please enter a non-negative integer target.");
  }
} else {
  console.log("No input provided");
}
let count=0;
for(let i=0; i<hours.length; i++){
    if(hours[i]>=target){
        count++;
    } 

}

console.log(`Number of employees who met the target: ${count}`);


