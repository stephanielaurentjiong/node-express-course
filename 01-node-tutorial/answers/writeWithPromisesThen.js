const { writeFile, readFile } = require('fs').promises;

writeFile('./temp.txt', `First line`)
.then((secondResponse) => {
    console.log("first line")
    return writeFile('./temp.txt', `Second line`, { flag: 'a' })
})
.then ((thirdResponse) => {
    console.log("second line");
    return writeFile('./temp.txt', `Third line`, { flag: 'a' })
})
.then ((readFileResponse) => {
    console.log("third line");
    return readFile('./temp.txt', "utf-8")
})
.then((data) => {
    console.log("file read")
    console.log(data)
})

.catch((error) => {
    console.log("An error occured: ", error)
})

// Explanation:
// Writes first line to temp.txt > logs first line > appends second line to temp.txt > logs second line > appends third line to temp.txt > logs third line > reads the content of temp.txt > logs file read