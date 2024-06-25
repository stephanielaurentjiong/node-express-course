const os = require('os')

// info about current user
const user = os.userInfo()
// retrieves information about the current user, such as username, homedir, and shell
console.log(user)

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`)


// This creates an object containing the OS type, release version, total memory, and free memory, and then logs it
const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
}
console.log(currentOS)
