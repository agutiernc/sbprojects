/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} 
   * 
   * */
  
  makeChains() {
    let map = new Map()
    const words = this.words

    for (let i = 0; i < words.length; i++) {
      let nextWord = words[i + 1] || null

      map.has(words[i]) ? map.get(words[i]).push(nextWord) : map.set(words[i], [nextWord]) 
    }

    this.chains = Object.fromEntries(map)
  }

  // get random key from array
  static randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

  /** return random text from chains */

  makeText(numWords = 100) {
    const keys = Object.keys(this.chains)
    let randomKey = MarkovMachine.randomItem(keys)
    let output = []

    while (output.length < numWords && randomKey !== null) {
      output.push(randomKey);
      
      randomKey = MarkovMachine.randomItem(this.chains[randomKey]);
    }

    return output.join(' ')
  }
}

module.exports = { MarkovMachine }
