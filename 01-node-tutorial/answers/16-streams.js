
// const { createReadStream } = require('fs')
// const stream = createReadStream('../content/big.txt', { highWatermark : 100, encoding : 'utf8'})

const fs = require('fs');
const path = require('path');

// Correct path to the big file
const filePath = path.join(__dirname, '../content/big.txt');

// Log the file path to ensure it's correct
console.log(`Reading file from: ${filePath}`);

// Create a read stream with specified options
const stream = fs.createReadStream(filePath, { encoding: 'utf8', highWaterMark: 200 });

// The highWaterMark is the maximum amount of bytes that node will read with each chunk of the stream.

let counter = 0;

stream.on("data", (chunck) => {
    counter++;
    console.log(`Received chunk ${counter}`);
    console.log(`Chuncks: ${chunck}`)
})

stream.on("end", () => {
    console.log(`Stream ended. Total chuncks received ${counter}`)
})

stream.on("error", (err) => {
    console.log(err)
})

