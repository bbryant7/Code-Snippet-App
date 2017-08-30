const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/snippetdb');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const snippetSchema = require('./models/snippet')
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({
  extended: false
}));


// const snippetTest1 = new snippetSchema({
//   title: "Snippet Test1",
//   body: "first entry into snippetDB",
//   language: "HTML",
//   tag: ["frontend", "skjdfhsdl", "meow"]
// })
//
// const snippetTest2 = new snippetSchema({
//   title: "modules boiler plate code for Mustache and Body-parser",
//   body: "app.engine('mustache', mustacheExpress()); app.set('views', './views') app.set('view engine', 'mustache') app.use(bodyParser.urlencoded({extended: false}));",
//   language: 'Javascript',
//   tag: ['modules', 'mustache']
// })
//
//  snippetTest2.save()
//     .then(function() {
//     console.log('saved ' + snippetTest2);
//   }).catch(function(error) {
//   console.log('error ' + JSON.stringify(error));
//  })


app.get('/', function(req, res) {
snippetSchema.find().then(function(snippets){
res.render('display-snippet', {available: snippets});

})

});

app.post("/add", function(req, res) {
  let newTitle = req.body.title;
  let newBody = req.body.body;
  let newDetail = req.body.detail;
  let newLanguage = req.body.language;
  let newTag = req.body.tag;

  const newSnippet = new snippetSchema({
    title: newTitle,
    body: newBody,
    detail: newDetail,
    language: newLanguage,
    tag: newTag
  })

  newSnippet.save()
  .then(function() {
    return snippetSchema.find()
  })
  .then(function(snippets) {
    res.render('display-snippet', {
      available: snippets})

  })

});


app.listen(3000, function() {
  console.log('Successfully started express application!');
})


process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
