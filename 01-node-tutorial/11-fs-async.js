const { readFile, writeFile } = require('fs')

// console.log('start')
// readFile('./content/first.txt', 'utf8', (err, result) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   const first = result

//   readFile('./content/second.txt', 'utf8', (err, result) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     const second = result

//     writeFile(
//       './content/result-async.txt',
//       `Here is the result : ${first}, ${second}`,
//       (err, result) => {
//         if (err) {
//           console.log(err)
//           return
//         }
//         console.log('done with this task')
//       }
//     )
//   })
// })
// console.log('starting next task')
console.log("at start");

writeFile('./temporary/fileB.txt', `This is the first line. `, 
  (err, result) => {
    console.log("at point 1")
    if (err) {
      console.log("This error happened: ", err)
      return
    } 

    writeFile('./temporary/fileB.txt', `This is the second line. `, { flag: 'a' },
    (err, result) => {
      console.log("at point 2")
      if (err) {
        console.log("This error happened: ", err)
        return
      }

      writeFile('./temporary/fileB.txt', `This is the third line. `, { flag: 'a' },
      (err, result) => {
        console.log("at point 3")
        if (err) {
          console.log("This error happened: ", err)
          return
        }
        readFile('./temporary/fileB.txt', 'utf8', (err, result) => {
          if (err) {
            console.log('File contents:\n' + result)
          }
        });
      });
    });
  });
console.log('end point')