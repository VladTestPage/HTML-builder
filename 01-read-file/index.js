const fs = require('fs')
const path = require('path')

const readStream = fs.createReadStream(
  path.join(__dirname, path.sep, 'text.txt')
)

readStream.on('data', (data) => {
  console.log(data.toString())
})
