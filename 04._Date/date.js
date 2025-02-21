// app intent: learn and utilize 
    // the Date object in JavaScript 
    // with REST API of Express


const express = require('express');
const app = express();
app.use(express.json());

const PORT = 8080;

app.listen(PORT, () => console.log("Server is running on port", PORT));

// core logic:

console.log(new Date()); // UTC

console.log(Date()); // local date time (CEST in my case)  

console.log(Date.now()); // Unix time / Epoch (Seconds since 1970 jan 1)


// assignment: Create a route called /months that returns the current month in text format

// planning structure:
   // 1. Understand the problem and requirements
   // 2. Plan your approach
   // 3. Implement a solution
   // 4. Test with different cases
   // 5. Optimize if needed

// planning for this assignment:
   // 1. Understand the problem and requirements
         // - /months route
         // - returns json object with current month in string
         // 

// v1
app.get('/months/v1', (req, res) => {
    
    let currentMonth = new Date().getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', "December"]

    currentMonth = months[currentMonth]

    
    res.send({ data: `current month: ${currentMonth}` })
})

// v2
   // declaring months array outside of the route handler
   // remove unnecessary variable assignment (let currentMonth)
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', "December"]

app.get('/months/v2', (req, res) => {
   const currentMonth = months[new Date().getMonth()]

   res.send({ data: `current month: ${currentMonth}` })
})

console.log(Date().split(" ")[1]); // month 2 in text format

// v3
   // using toLocaleString method

app.get('/months/v3', (req, res) => {
   const currentMonth = new Date().toLocaleString('en-UK', { month: 'long' }); // long -> full month name, short -> short month name

   res.send({ data: currentMonth });
})

// v4
   // using toLocaleString method with options object
   // declaring months array outside of the route handler


// assignment: implement /days that returns the weekday as a word

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

app.get('/days/v1', (req, res) => {
   const currentDay = days[new Date().getDay()];

   res.send({ data: currentDay });
})

// v2
   // using toLocaleString method

app.get('/days/v2', (req, res) => {
   const currentDay = new Date().toLocaleString('en-UK', { weekday: 'long' });

   res.send({ data: currentDay });
});

// v3 
   // using toLocaleString method with options object

