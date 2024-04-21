 

// let inputString = prompt("Enter comma-separated numbers of nums :"); // Prompt the user to enter comma-separated numbers
// let nums: number[] = [];

// if (inputString) { 
//     let words: string[] = inputString.split(",").filter(word => isNaN(Number(word))); 
//     if (words.length > 0) {
//          console.log("Error: Input should only contain numbers"); 
//         } else { 
//             nums = inputString.split(",").map(Number).filter(nums =>  Number.isInteger(nums)); 
//             console.log(`Array of nums ${nums}`); 
//         } 
//     } else {
//              console.log("No input provided"); 
//          }

// //input target

// let targetInput: string | null = prompt("Enter an integer target:");
// var target: any;
// if (targetInput) {
//  target = parseInt(targetInput);

//   if (!isNaN(target) && Number.isInteger(target)) {
//     console.log("Target:", target);
//   } else {
//         console.log("Invalid input. Please enter a non-negative integer target.");
//       } 
// } else {
//   console.log("No input provided");
// }

// let count=0;

// for(let i=0; i<nums.length; i++){
//   for(let j=1; j<nums.length; j++){
//     if(0<=i && i<j && j<nums.length){
//       if(nums[i] + nums[j] < target){
//         count++;
//       }
//     }
    
  
//   }
// }
// console.log( `There are ${count} pairs of indices that satisfy`);