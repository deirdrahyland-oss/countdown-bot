require("dotenv").config();

console.log("TOKEN EXISTS:", !!process.env.TOKEN);
console.log("TOKEN LENGTH:", process.env.TOKEN ? process.env.TOKEN.length : 0);

setInterval(() => {}, 1000);
