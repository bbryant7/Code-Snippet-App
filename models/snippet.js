const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  body: {type: String, required: true},
  detail: String,
  language: {type: String, required: true},
  tag: [String],

})

const snippet = mongoose.model('snippet', snippetSchema);

module.exports = snippet;
