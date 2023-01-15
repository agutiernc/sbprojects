// add whatever parameters you deem necessary
function twoArrayObject(arr1, arr2) {
  const keysVals = []
  
  for (let i = 0; i < arr1.length; i++) {
    keysVals.push([arr1[i], arr2[i] || null])
  }

  let map = new Map(keysVals)
  
  return Object.fromEntries(map)
}