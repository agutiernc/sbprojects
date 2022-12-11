/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if (i === nums.length) return 1

	return nums[i] * product(nums, i + 1)
}


/** longest: return the length of the longest word in an array of words. */

function longest(words, i = 0, maxWord = 0) {
  if (i === words.length) return maxWord

  maxWord = Math.max(words[i].length, maxWord)

  return longest(words, i + 1, maxWord)
}


/** everyOther: return a string with every other letter. */

function everyOther(str, i = 0, result = '') {
  if (i >= str.length) return result

  result += str[i]
  
  return everyOther(str, i + 2, result)
}


/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, idx = 0, result = '') {
  if (str.length === idx) return str === result

  result += str[str.length - idx - 1]
  
  return isPalindrome(str, idx + 1, result)
}


/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i = 0) {
  if (i === arr.length) return -1

  if (arr[i] === val) return i

  return findIndex(arr, val, i + 1)
}


/** revString: return a copy of a string, but in reverse. */

function revString(str, idx = 0, result = '') {
  if (result.length === str.length) return result

  result += str[str.length - idx - 1]
  
  return revString(str, idx + 1, result)
}


/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, count = 0) {
  const arr = []

  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      arr.push(obj[key])
    }

    if (typeof obj[key] === 'object') {
      arr.push(...gatherStrings(obj[key]))
    }
  }

  return arr
}


/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, leftIdx = 0, rightIdx = arr.length) {
  if (leftIdx > rightIdx) return -1;

  let midIdx = Math.floor((rightIdx + leftIdx) / 2);

  if (arr[midIdx] === val) return midIdx;

  if (arr[midIdx] > val) {
    return binarySearch(arr, val, leftIdx, midIdx - 1);
  }

  return binarySearch(arr, val, midIdx + 1, rightIdx);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
