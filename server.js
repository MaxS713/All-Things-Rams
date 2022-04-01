const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/all-things-rams");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));


app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});