function freqCounter(str) {
  const obj = {}

  for (let char of str) {
    obj[char] = (obj[char] + 1) || 1
  }

  return obj
}

function constructNote(str1, str2) {
  const freqStr1 = freqCounter(str1)
  const freqStr2 = freqCounter(str2)

  for (let char in freqStr1) {
    if (!freqStr2.hasOwnProperty(char) || freqStr1[char] > freqStr2[char]) {
      return false
    }
  }

  return true
}