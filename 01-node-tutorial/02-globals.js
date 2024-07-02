// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

console.log('__dirname:', __dirname)
console.log('__filename:', __filename)

// in the terminal type -> export MY_VAR="Hi there!" -> it will print out Hi there!
console.log(process.env.MY_VAR)

// setInterval(() => {
//   console.log('hello world')
// }, 1000)
