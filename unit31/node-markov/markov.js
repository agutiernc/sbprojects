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

    this.chains = Object.fromEntries(map)
  }

  // get random key from array
  static randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

  /** return random text from chains */

  makeText(numWords = 100) {
    /** TODO
      * get keys into an array
      * grab a random key
      * loop through numWords as long as numWords is greater than output and "key" aren't null
      *    push a key into output array
      *    get a random key's value from this.chains
         return output array - join it
    **/
    const keys = Object.keys(this.chains)
    let randomKey = MarkovMachine.randomItem(keys)
    let output = []

    while (output.length < numWords && randomKey !== null) {
      output.push(randomKey);
      
      randomKey = MarkovMachine.randomItem(this.chains[randomKey]);
    }

    return output
  }
}
