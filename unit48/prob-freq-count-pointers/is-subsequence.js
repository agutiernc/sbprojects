function isSubsequence(str1, str2) {
  let str1Idx = 0
  let str2Idx = 0

  while (str2Idx < str2.length) {
    if (str1[str1Idx] === str2[str2Idx]) {
      str1Idx += 1
    }

    if (str1Idx === str1.length) {
      return true
    }

    str2Idx += 1
  }

  return false
}