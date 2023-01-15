function averagePair(arr, num) {
  let left = 0
  let right = arr.length - 1

  while (left < right) {
    let avg = (arr[left] + arr[right]) / 2

    if (avg === num) {
      return true
    } else if (avg < num) {
      left++
    } else {
      right--
    }
  }

  return false
}