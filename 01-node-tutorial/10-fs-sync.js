const { readFileSync, writeFileSync } = require('fs');
// console.log('start')
// const first = readFileSync('./content/first.txt', 'utf8')
// const second = readFileSync('./content/second.txt', 'utf8')

// writeFileSync(
//   './content/result-sync.txt',
//   `Here is the result : ${first}, ${second}`,
//   { flag: 'a' }
// )

// console.log('done with this task')
// console.log('starting the next one')



writeFileSync(
  './temporary/fileA.txt',
  `This is the first line. `,
)

writeFileSync(
  './temporary/fileA.txt',
  `This is the second line. `,
  { flag: 'a'}
)

writeFileSync(
  './temporary/fileA.txt',
  `This is the third line. `,
  { flag: 'a'}
)

const fileContent = readFileSync('./temporary/fileA.txt', 'utf8')

console.log(fileContent)
