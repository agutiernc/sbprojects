const { MarkovMachine } = require("./markov");

describe('Test Markov class', function() {
  let mm = new MarkovMachine('the cat in the hat')

  test('check for one word', function() {
    let mm = new MarkovMachine('one')
    const word = mm.makeText()

    expect(word).toBe('one')
  })

  test('test output is less than 15 characters', function() {
    const words = mm.makeText()

    expect(words.length).toBeLessThan(15)
  })

  test('test output returns a string', function() {
    const words = mm.makeText()

    expect(typeof words).toBe("string")
  })

  test('test makeChains returns undefined', function() {
    const chain = mm.makeChains()

    expect(chain).toBeUndefined()
  })
})