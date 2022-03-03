/*
Quick Question #1
What does the following code return?

new Set([1,1,2,2,3,4])
*/
[1, 2, 3, 4]


/*
Quick Question #2
What does the following code return?

[...new Set("referee")].join("")
*/
'ref'


/*
Quick Questions #3
What does the Map m look like after running the following code?

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
*/
// Returns:
// 0: { Array(3) => true }
// 1: { Array(3) => false }


// ===============================
/* 
hasDuplicate
Write a function called hasDuplicate which accepts an array and returns true 
or false if that array contains a duplicate
*/
const hasDuplicate = (arr) => (new Set(arr)).size !== arr.length

/*
vowelCount
Write a function called vowelCount which accepts a string and returns a map 
where the keys are numbers and the values are the count of the vowels in the 
string.
*/
const vowelCount = (str) => {
  const strArr = str.toLowerCase().split('')
  const vowels = 'aeiou'
  let vowelsMap = new Map()

  // creates Map of vowels that str has
  for (let char of vowels) {
    if (str.includes(char)) {
      vowelsMap.set(char, 0)
    }
  }

  // increments value of vowels in Map
  for (let char of strArr) {
    if (vowelsMap.has(char)){
      vowelsMap.set(char, vowelsMap.get(char) + 1)
    }
  }

  return vowelsMap
}