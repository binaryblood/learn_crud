var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
const mongoose = require('mongoose')
const book_routes = require('./routes/book_routes')

mongoose.connect("mongodb://localhost:27017/library", { useNewUrlParser: true }).then(() =>{
console.log("Connected to db");

const app = express()
// This is to enable parsing json in the POST methods
app.use(express.json())
app.use(cors())
app.use("/api", book_routes)
app.listen(3000, () => {
    console.log("server started")
  })
})
