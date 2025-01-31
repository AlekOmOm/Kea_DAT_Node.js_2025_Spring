// --------------------------------------
// Variables, strings, numbers, floats
// --------------------------------------
// Exercise 1 - Console and constiables

const firstName = "Anders";
const lastName = "Latif";
// EXERCISE
// show in the console
// My first name is Anders and my last name is Latif

console.log(`My first name is ${firstName} and my last name is ${lastName}`)

const intro = (first, last) => {
   console.log(`My first name is ${first} and my last name is ${last}`)
}

intro(firstName,lastName)



// --------------------------------------
// Exercise 2 - Numbers and Strings

const year = "2024";
const increment = 1;

// Add the year plus the increment
// The result should be 2025
// You cannot touch the first or the second line


// in js, Integer data type doesnt exist
// float is a Number 
// 
const new_year = parseInt(year) + increment
const new_year2 = Number(year)+1
const new_year3 = +year + increment // +year converts it to a number

console.log(new_year)
console.log(new_year2)
console.log(new_year3)

const isItANumber = "3424dsf"

console.log(Number(isItANumber))
console.log("error code", parseInt(isItANumber))
// --------------------------------------
