/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, start = 0, end = arr.length - 1){
  function swap(arr, leftIdx, rightIdx) {
    let temp = arr[leftIdx]

    arr[leftIdx] = arr[rightIdx]
    arr[rightIdx] = temp
  }

  let pivot = arr[start]
  let swapIdx = start

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++

      swap(arr, swapIdx, i)
    }
  }

  swap(arr, start, swapIdx)

  return swapIdx
}


/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIdx = pivot(arr, left, right)

    quickSort(arr, left, pivotIdx - 1)
    quickSort(arr, pivotIdx + 1, right)
  }

  return arr
}

module.exports = { pivot, quickSort };