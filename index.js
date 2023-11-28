const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { connectDB } = require("./connection");
require("dotenv/config");

const app = express();
const port = 3000;

//middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));

const api = process.env.API_URL;

//Routes
const {
  productsRouter,
  userRouter,
  orderRouter,
  categroyRouter,
} = require("./routers/index");
app.use(`${api}/products`, productsRouter);
app.use(`${api}/user`, userRouter);
app.use(`${api}/user/order`, orderRouter);
app.use(`${api}/category`, categroyRouter);

//CONNECT TO DATABASE
connectDB(process.env.DB_URL);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
