function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = arr[i];
    let idx = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        idx = j;
      }
    }

    if (idx !== i) {
      arr[idx] = arr[i];
      arr[i] = min;
    }
  }
  
  return arr;
}

module.exports = selectionSort;