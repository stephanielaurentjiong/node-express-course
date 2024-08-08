require("dotenv").config();
// require("express-async-errors");

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");

app.use(express.json()); // Parse incoming JSON requests and make the data available in req.body
app.use("/api/v1", mainRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
