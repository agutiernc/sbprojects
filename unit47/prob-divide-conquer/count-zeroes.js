function countZeroes(arr) {
  let newArr = []
  let leftIdx = 0
  let rightIdx = arr.length - 1

  while(rightIdx >= leftIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2)
    let midVal = arr[midIdx]

    if (midVal === 0) {
      newArr.push(arr.slice(midIdx))

      rightIdx = midIdx - 1
    }

    if (midVal === 1) {
      leftIdx = midIdx + 1
    }
  }

  if (newArr.length === 2) {
    return newArr[1].length
  } else if (newArr.length === 1) {
    return newArr[0].length
  } else {
    return 0
  }
}

module.exports = countZeroes
