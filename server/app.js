const express = require("express");
const cors = require("cors"); // 1. IMPORT CORS
const app = express();
const port = 8888;

const medicalEntriesController = require("./controller/medicalEntries");
const passportController = require("./controller/passport");

app.use(cors()); // 2. USE CORS (put this before your routes!)
app.use(express.json()); // support for application/json
app.use(express.urlencoded({ extended: true })); // support for application/x-www-form-urlencoded

//redirecting it to our menu we created under function list
app.get("/", (req, res) => {
  res.redirect("/passport/list");
});

app.use("/medicalEntries", medicalEntriesController);
app.use("/passport", passportController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
