function freqCounter(str) {
  const obj = {}
  
  for (let char of str) {
    obj[char] = (obj[char] + 1) || 1
  }

  return obj
}

function sameFrequency(num1, num2) {
  const str1 = String(num1)
  const str2 = String(num2)

  if (str1.length !== str2.length) return false
  
  const str1Freq = freqCounter(str1)
  const str2Freq = freqCounter(str2)
  
  for (let char in str1Freq) {
    if (str1Freq[char] !== str2Freq[char]) return false
  }

  return true
}