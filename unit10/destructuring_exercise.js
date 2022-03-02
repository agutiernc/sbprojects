// ******* Object Destructuring 1 ********

console.log(numPlanets); // Returns => 8
console.log(yearNeptuneDiscovered); // Returns => 1846


// Object Destructuring 2
console.log(discoveryYears); 
/*
 Returns
{
  yearNeptuneDiscovered: 1846,
  yearMarsDiscovered: 1659
}
*/


// Object Destructuring 3
getUserData({firstName: "Alejandro", favoriteColor: "purple"}) // ?
//Returns => 'Your name is Alejandro and you like purple'

getUserData({firstName: "Melissa"}) // ?
// Returns => 'Your name is Melissa and you like green'

getUserData({}) // ?
// Returns => 'Your name is undefined and you like green'


// Array Destructuring 1
console.log(first); // ?
// Returns => 'Maya'

console.log(second); // ?
// Returns => 'Marisa'

console.log(third); // ?
// Returns => 'Chi'


// Array Destructuring 2
console.log(raindrops); // ?
// Returns => 'Raindrops on roses'

console.log(whiskers); // ?
// Returns => 'whiskers on kittens

console.log(aFewOfMyFavoriteThings); // ?
// Returns => 
[ 
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings"
]


// Array Destructuring 3
console.log(numbers) // ?
// Returns => [10, 30, 20]


// ****** ES2015 Refactoring ******

/* 
ES5 Assigning Variables to Object Properties
var obj = {
  numbers: {
    a: 1,
    b: 2
  }
};

var a = obj.numbers.a;
var b = obj.numbers.b;
*/
const obj = {
  numbers: {
    a: 1,
    b: 2
  }
}
const { a, b } = obj.numbers


/*
ES5 Array Swap - Refactor:
var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;
*/
let arr = [1, 2]
[arr[0], arr[1]] = [arr[1], arr[0]]


/* 
  raceResults()
*/
const raceResults = (first, second, third, ...rest) => { first, second, third, rest }
