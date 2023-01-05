function insertionSort(arr) {
  /**
   * -Start by picking the second element in the array (we will assume the first element is
   *    the start of the “sorted” portion)
      -Now compare the second element with the one before it and swap if necessary.
      -Continue to the next element and if it is in the incorrect order, iterate through the
        sorted portion to place the element in the correct place.
      -Repeat until the array is sorted.
   */
  for (let i = 0; i < arr.length; i++) {
    let small = i

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[small] > arr[j]) {
        small = j
      }
    }

    if (i !== small) {
      swap(arr, i, small)
    }
  }

  return arr
}

function swap(arr, i, j) {
  let temp = arr[i]

  arr[i] = arr[j]
  arr[j] = temp
}

module.exports = insertionSort;