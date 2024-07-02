const path = require('path')

// seperator is a slash
console.log(path.sep)

// path.join function to join up a sequence of alphanumeric strings, and it should print out the result
const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)
