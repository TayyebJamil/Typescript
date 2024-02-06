// <!-- Find words containing character
// You are given a 0-indexed array of strings words and a character x.

// Return an array of indices representing the words that contain the character x.

// Note that the returned array may be in any order. -->
 
const input = prompt("Enter words separated by commas: ");
const words: string[] = input!.split(",").map((word) => word.trim());

const a: string = prompt("Enter character to be found: ") || "";
console.log("Entered words are :",words);
console.log("Entered character: ", a);
 

 
for (let i = 0; i < words.length; i++) {
    const word: string = words[i];
    for (let j = 0; j < word.length; j++) {
    if(word[j]==a){
        console.log("Your character "+a+"occurs at inde "+i)
        }
    }
      
}

  
 

