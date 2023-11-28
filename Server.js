const express = require("express");
const mongoose = require("mongoose");
const { UserAuthRoute } = require("./routes/index");
const app = express();
// accept json data
app.use(express.json());
// connect to db
const dburl = "mongodb://localhost:27017";

async function Connectdb(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
}

// auth UserforAdmin
app.use("/", UserAuthRoute);

app.listen(3000, () => {
  console.log("Server running on port; 3000");
  Connectdb(dburl);
});
