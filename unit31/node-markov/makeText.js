/** Command-line tool to generate Markov text. */

const fs = require('fs')
const axios = require('axios')
const markov = require("./markov")

// generate Markov text
function getText(text) {
  let mm =  new markov.MarkovMachine(text);
  
  console.log(mm.makeText());
}

// generate text from file
function makeFileText (path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`)
      process.kill(1)
    }

    getText(data)
  })
}

// generate text from URL
async function makeURLText (path) {
  try {
    const res = await axios.get(path)

    getText(res.data)
  } catch (err) {
    console.log(`Error fetching ${path}: ${err}`)
    process.exit(1)
  }
}

// process request depending if data is from a file or url
let path;

if (process.argv[2] === 'file') {
  path = process.argv[3]

  makeFileText(path)
} else  if (process.argv[2] === 'url'){
  path = process.argv[3]

  makeURLText(path)
} else {
  console.error('Path must be a file or url')

  process.exit(1)
}