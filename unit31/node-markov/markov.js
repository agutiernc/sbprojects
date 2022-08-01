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
   *  for each word, get the next word and add to array/object
   * 
   *  if next word is next, then add to array
   * */
  
  makeChains() {
    let map = new Map()
    const words = this.words

    for (let i = 0; i < words.length; i++) {
      let nextWord = words[i + 1] || null

      map.has(words[i]) ? map.get(words[i]).push(nextWord) : map.set(words[i], [nextWord]) 
    }

    return Object.fromEntries(map)
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}
