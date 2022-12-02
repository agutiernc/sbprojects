
let result = {};

// sets numbers into object and counts frequency
function count(input){
  let tmp = 0;

  if (result.hasOwnProperty(input)){
     tmp = result[input];

     result[input] = tmp + 1;
  } else {
    result[input] = 1;
  }
}


function sortedFrequency(arr, num) {
  const leftIdx = 0
  const rightIdx = arr.length - 1
  const midIdx = Math.floor((leftIdx + rightIdx) / 2);
  const midVal = arr[midIdx];
  
  count(midVal) // add midVal to obj

  // check and add neighboring elements to object
  if (arr[midIdx - 1] === midVal) count(arr[midIdx - 1])
  if (arr[midIdx + 1] === midVal) count(arr[midIdx + 1])

  // split original array into 2 smaller ones
  const newArr1 = arr.slice(0, midIdx - 1)
  const newArr2 = arr.slice(midIdx + 2)

  // adds remaining numbers to object
  newArr1.forEach(x => count(x))
  newArr2.forEach(x => count(x))

  const answer = result[num]

  result = {} // reset global

  return answer ? answer : -1
}

module.exports = sortedFrequency




