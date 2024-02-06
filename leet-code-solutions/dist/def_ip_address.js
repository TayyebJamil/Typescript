"use strict";
// const ipAddress  = prompt("Enter an ip address");   
// function validateIPAddress(ipAddress: any): boolean {
//     const ipPattern: RegExp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
//     return ipPattern.test(ipAddress);
// }
// if(validateIPAddress(ipAddress)) {
//     console.log(`${ipAddress} is a valid IP address.`);
// } else {
//     console.log(`${ipAddress} is not a valid IP address.`);
// }
let ipa = "192.168.1.1";
// var ipaa = prompt("Enter an ip address");
let output = "";
for (let i = 0; i < ipa.length; i++) {
    if (ipa[i] === '.') {
        output += " [.] " + i + " [.] ";
    }
    else {
        output += ipa[i];
    }
}
console.log(output);
