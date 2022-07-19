const fs = require('fs')
const axios = require('axios')

function handleOutput(out, content) {
  if (out) {
    fs.writeFile(out, content, 'utf8', function(err){
      if (err) {
        console.error(`Unable to write ${out}...`, err)
        process.exit(1)
      }
    })
  } else {
    console.log(content)
  }
}

function cat(path, out) {
  
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`)
      process.kill(1)
    }

    handleOutput(out, data)

    console.log('DATA: ', data)
  })
}

async function webCat(url, out) {
  try {
    const res = await axios.get(url)

    handleOutput(out, res.data)

    console.log(res.data)
  } catch (err) {
    console.log(`Error fetching ${url}: ${err}`)
    process.exit(1)
  }
}

let out
let path

if (process.argv[2] === '--out') {
  out = process.argv[3]
  path = process.argv[4]
} else {
  path = process.argv[2]
}

path.slice(0, 4) === 'http' ? webCat(path, out) : cat(path, out)