// validate every array element to be a number, else throw error
const validateArray = (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++) {
    let validNumber = +arr[i]

    if (isNaN(validNumber)) {
      return new Error(`${arr[i]} is not a valid number at index ${i}`)
    } else {
      result.push(validNumber)
    }
  }

  return result
}

const findMean = (arr) => arr.reduce((sum, current) => sum + current, 0) / arr.length

const findMedian = (arr) => {
  const midIdx = Math.floor(arr.length / 2)
  let median

  if (arr.length % 2 !== 0) {
    // for odd sequence of numbers
    median = +arr[midIdx]
  } else {
    // for even sequence of numbers
    median = (+arr[midIdx] + +arr[midIdx - 1]) / 2
  }

  return median
}

const findMode = (arr) => {
  const obj = {}

  arr.forEach(n => obj[n] ? obj[n] += 1 : obj[n] = 1)

  let mode = Object.keys(obj).sort((a, b) => obj[b] - obj[a])[0]

  return mode
}

module.exports = { validateArray, findMode, findMedian, findMean }