// First instruction
const { log } = require('console');

const { writeFile, readFile } = require('fs').promises;

const writer = async () => {
    try {
        const first = await writeFile('./temp.txt', `First line`);
        const second = await writeFile('./temp.txt', `Second line`, { flag: 'a' } );
        const third = await writeFile('./temp.txt', `Third line`, { flag: 'a' });
    } catch(err) {
        console.log("Error writing to file: ", err)
    }
}

const reader = async () => {
    try {
        const data = await readFile('./temp.txt', "utf-8")
        console.log(data)
    } catch(err) {
        console.log(err);
    }
}

// Because the writer and reader are both async functions, cannot just call them and cannot use await in mainline code. So, create another function (below) to call the above two funcitons.

const readWrite = async () => {
        await writer();
        await reader();
}

// And then call the readWrite function
readWrite()
