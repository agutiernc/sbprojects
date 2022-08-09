const { findMedian, findMode, findMean } = require('./helpers')

describe('findMean', function() {
  test('Find the mean of an array', function(){
    const arr = [1, 2, 3, 4, 5]

    expect(findMean(arr)).toEqual(3)
  })

  test('Test for an empty array', function() {
    expect(findMean([])).toEqual(NaN)
  })
})

describe('findMedian', function() {
  test('Find the median of an odd set', function() {
    const arr = [1,2,3,4,5]

    expect(findMedian(arr)).toEqual(3)
  })

  test('Find the median of an even set', function() {
    const arr = [1,2,3,4]

    expect(findMedian(arr)).toEqual(2.5)
  })
})

describe('findMode', function() {
  test('find the number that is most frequent', function() {
    const arr = [1,5,2,2,2,6,7,2]

    expect(findMode(arr)).toEqual(2)
  })
})