// Javascript is single-threaded, everything runs on the main-thread

// database interaction, file handling, fetch / HTTP requests (network)

// Solution 1: callback functions

// callback hell, pyramid of doom

// Solution 2: promises (syntactic sugar for callbacks)

// pending, fulfilled
// resolved / rejected

new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Everything went well");
    //reject("Something went wrong");
  }, 2000);
})
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

/*

*/

function myPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Something went well");
    }, 2000);
  });
}

/*
assignment Create a function the returns a promise
that is, a function that returns a new promise
the fuinctions should be called myPromise
and it should either resolve as "Something Good" or reject as "Something Bad"
create a 3 second timeout to simulate asychronous operations


*/

function myPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve("Something Good");
      } catch (error) {
        reject("Something Bad", error);
      }
    }, 3000);
  });
}
/*
myPromise()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
*/
function myPromise2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve("Something Good");
      } catch (error) {
        reject("Something Bad");
      }
    }, 3000);
  });
}

// --- myFetch

/* assignment

    try to simulate the fetch function
    call it myFetch
    it should return the promise json() after 2.5 seconds
    so that you can call response.json() on it 
    as much as possible try to imagine how fetch works and simulate the underlying code

*/

function myFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        json: () =>
          new Promise((resolve, reject) => resolve("Data from the server")),
      });
    }, 2500);
  });
}
/*
myFetch()
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
*/

// async await solves nested promises
async function executeFetch() {
  const response = await myFetch();
  const data = await response.json();
  console.log(data);
}

// executeFetch();

(async function executeFetch() {
  const response = await myFetch();
  const data = await response.json();
  console.log(data);
})();
