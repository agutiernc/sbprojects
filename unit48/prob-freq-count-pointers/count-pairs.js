function countPairs(arr, num) {
  let vals = new Set(arr)
  let count = 0

  for (let val of arr) {
    vals.delete(val)
    
    if (vals.has(num - val)) count++
  }

  return count
}
