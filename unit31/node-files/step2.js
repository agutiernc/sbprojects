const fs = require('fs')
const axios = require('axios')

function cat(path) {
  
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`)
      process.kill(1)
    }

    console.log('DATA: ', data)
  })
}

async function webCat(url) {
  try {
    const res = await axios.get(url)

    console.log(res.data)
  } catch (err) {
    console.log(`Error fetching ${url}: ${err}`)
  }
}

const path = process.argv[2]

path.slice(0, 4) === 'http' ? webCat(path) : cat(path)