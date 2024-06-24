const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber)

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.

// let item = "Enter something below.";
let message = "Guess a number between 1 and 100";
let guessResult = ""

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${message}</p>
  <form method="POST">
  <input type="number" name="guess" min="1" max="100" required></input>
  <button type="submit">Submit</button>
  </form>
  <p>${guessResult}</p>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic

      // checks if a guess was entered
      if (body["guess"]) {
        const userGuess = parseInt(body["guess"], 10);
        
        if (userGuess < randomNumber) {
          message = `Too low!`;
        } else if (userGuess > randomNumber) {
          message = `Too high!`;
        } else {
          message = `Congratulations! You guessed the correct number: ${randomNumber}`;
        }
      } else {
        message = "No guess entered.";
      }
      
      guessResult = "Your guess: " + body["guess"];
        
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
