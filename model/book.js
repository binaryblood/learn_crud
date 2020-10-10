const mongoose = require("mongoose")
const schema = mongoose.Schema({
  name: String,
  author: String
})
module.exports = mongoose.model("Book", schema)
