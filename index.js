import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(
    "Hey Developers! We made you develop your Ecommerce Web-App easily like never before through our API....Stay tuned...."
  );
});

app.listen(3000, () => {
  console.log("Server running on port; 3000");
});
