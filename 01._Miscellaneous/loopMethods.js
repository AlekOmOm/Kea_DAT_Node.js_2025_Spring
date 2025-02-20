

// forEach, map, filter, reduce, find

   // map = iterates over each element and 'maps' it to a new array
   //  

// Best practice:
   // -> use loop methods in JavaScript
   // avoid side-effects

const myNumbers = [1,2,3,4,5,6];


// assignment: get a list of double the numbers

// forEach
   // for each x perform function
const doubleNumbers_ForEach = []

myNumbers.forEach(function(x) { 
  doubleNumbers_ForEach.push(x * 2)
})

console.log(doubleNumbers_ForEach)

   // -> Side effect


// map

   // clean 
const doubleNumbers = myNumbers.map(x => x * 2)

console.log( doubleNumbers )



// 

const satellites = [
   {
      name: "International Space Station",
      height: 12_000
   },
   {
      name: "MIR",
      height: 0
   },
   {
      name: "James Webb",
      height: 27_000
   }
]


// assignment: lower the heigh for all satellites by 3.000 except for MIR

const satellites_updated = satellites.map(satellite => {
      if (satellite.name != "MIR") { // if not MIR
         satellite.height -= 3_000
      }
      
      return satellite
   }
)

console.log (satellites_updated) 

// note: 
   // instead of mutating the original array, we create a new array with the updated values
   // -> no side effects



const satellites_updated_terniary = satellites.map(satellite => {
   return satellite.name != "MIR" ? { ...satellite, height: satellite.height - 3_000 } : satellite
})
// note:
   // setup: 
      // map 
      // terniary operator 
      // returning a new object
   // -> no side effects
   // -> more readable
   // -> more maintainable
   // -> more scalable

const satellites_updated_terniary_sd = satellites.map(satellite => ({
   height: satellite.name === "MIR" ? satellite.height : satellite.height - 3_000,
   name: satellite.name
}))



// parallilized map solution
   // parallelizing is 

const satellites_updated_parallel = satellites.map(satellite => {
   if (satellite.name != "MIR") { // if not MIR
      return {
         ...satellite,
         height: satellite.height - 3_000
      }
   }
   return satellite
})

// note paralilized map solution
   // -> no side effects
   // -> more readable
   // -> more maintainable
   // -> more scalable




// assignment: make a list that reacts as many times as above with thumbs up
   // understanding: a new list, with the same amount of elements as the original list
         // -> each element is a thumbs up ie. "👍"
         // -> reacts ie. thumbs up

const thumps_up = satellites.map(satellite => '👍')

console.log (thumps_up)

const listOfReactions = ["thumbs down", "thumbs up", "heart"]
const reactions = listOfReactions.map()
// forEach, map, filter, reduce, findIndex, find

const myNumbers = [1, 2, 3, 4, 5, 6];

// assignment: get a list of the numbers doubled

const doubledNumbers = myNumbers.map((myNumber) => myNumber * 2);

// console.log(myNumbers);

const satellites = [
    {
        name: "International Space Station",
        height: 12_000
    },
    {
        name: "MIR",
        height: 0
    },
    {
        name: "James Webb",
        height: 27_000
    }
];

const satellitesAdjustedHeight = satellites.map((satellite) => ({
    height: satellite.name === "MIR" ? satellite.height : satellite.height - 3000,
    name: satellite.name
}));

// console.log(satellitesAdjustedHeight);

// assignment: lower the height for all satellites by 3.000 except for MIR

const listOfReactions = ["thumbs down", "thumbs down", "thumbs down"];

// assignment: make a list that reacts as many times as above with thumbs up

const updatedReactions = listOfReactions.map((reaction) => "thums up");


listOfReactions.forEach((value, index, array) => console.log(value, index, array));
