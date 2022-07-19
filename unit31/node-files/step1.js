const fs = require('fs')

function cat(path) {
  
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`)
      process.kill(1)
    }

    console.log('DATA: ', data)
  })
}

cat(process.argv[2])