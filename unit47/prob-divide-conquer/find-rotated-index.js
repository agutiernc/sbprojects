function findRotatedIndex(arr, num) {
  let leftIdx = 0
  let rightIdx = arr.length - 1

  while (rightIdx >= leftIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2)
    let midVal = arr[midIdx]

    if (num === midVal) return midIdx

    if (midVal < num) {
      if (arr[midIdx + 1] < num && arr[leftIdx] > num) {
        rightIdx = midIdx - 1
      } else {
        leftIdx = midIdx + 1
      }
    }

    if (midVal > num) {
      if (arr[leftIdx] <= num) {
        rightIdx = midIdx - 1
      } else {
        leftIdx = midIdx + 1
      }
    }
  }

  return -1
}

module.exports = findRotatedIndex