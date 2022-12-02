function findFloor(arr, num) {
  let leftIdx = 0
  let rightIdx = arr.length - 1

  while (rightIdx >= leftIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2)
    let midVal = arr[midIdx]

    if (
        midVal === num ||
        midVal < num && midIdx === arr.length - 1 ||
        midVal < num && arr[midIdx + 1] > num
      ) {
        return midVal
      } else if (midVal > num) {
        rightIdx = midIdx - 1
      } else {
        leftIdx = midIdx + 1
      }
  }

  return -1
}

module.exports = findFloor