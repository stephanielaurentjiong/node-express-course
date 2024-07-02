const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("coffeeOrder", (name, size, drink) => {
    console.log(`Order received! ${name} order is ${size} ${drink}`)
});

emitter.emit("coffeeOrder", "Stephanie", "grande", "ice latte")

// setInterval(() => {
//     emitter.emit("timer", "hi there");
// }, 2000);

// emitter.on("timer", (msg) => console.log(msg));

// const waitForEvent = () => {
//     return new Promise((resolve) => {
//         emitter.on("happens", (msg) => resolve(msg));
//     });
// };

// const doWait = async () => {
//     const msg = await waitForEvent();
//     console.log("We got an event! Here it is: ", msg);
// };

// doWait;
// emitter.emit("happens", "Hello World!");