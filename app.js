const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/snippetdb');
// const objectId = require('mongodb').ObjectID;
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const snippetSchema = require('./models/snippet')
const app = express();
let data = [{
  username:"kitty",
  password:"unicorn"
}, {
  username:"bailey",
  password:"poop"
}];


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  console.log('in interceptor');
  if (req.url === '/login') {
    next()
    console.log(1);
  } else if (req.url === '/registration'){
    next()
    console.log(4);
  }else if (!req.session.username) {
    console.log(2);
    res.render('login')

  } else {
      console.log(3);
    next()
  }
})

// HOME PAGE - with list of snippets
app.get('/', function(req, res) {
  snippetSchema.find().then(function(snippets) {
    res.render('home', {
      available: snippets
    });

  })

});

// FOLLOW LINK TO SNIPPET DETAILS

app.get('/snippet/:id', function(req, res){
  snippetSchema.findOne().where({_id: (req.params.id)}).then(function(snippet){
    res.render('snippet'
    , {available: snippet})
  })
  console.log(req.params.id);
});

// LOGIN PAGE
app.post('/login',function(req,res){

  for (var i = 0; i < data.length; i++) {
    if (req.body.username === data[i].username && req.body.password === data[i].password){
      req.session.username = req.body.username
    }
  }

  if(req.session.username === req.body.username){
      snippetSchema.find().then(function(snippets) {
        res.render('home', {available: snippets});
        console.log("correct Password");
      })
    } else{
      res.render('login', {error: "Incorrect username or password."});
      console.log("wrong password");
    }

})


// registration

app.post('/registration',function(req,res){
  data.push({username: req.body.regusername, password: req.body.regpassword})
  req.session.username = req.body.regusername
  snippetSchema.find()
    .then(function(snippets) {
    res.render('home', {
      available: snippets
    });
})
})

// ADD SNIPPET

app.post("/add", function(req, res) {
  let newTitle = req.body.title;
  let newBody = req.body.body;
  let newDetail = req.body.detail;
  let newLanguage = req.body.language;
  let newTag = req.body.tag.split(",");

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
      res.render('home', {
        available: snippets
      })

    })

});

// DELETE

app.post("/delete/:id", function(req, res) {
  snippetSchema.deleteOne().where({_id: (req.params.id)})
  .then(function(){
    return snippetSchema.find()
  })
  .then(function(snippet){res.render('home', {available: snippet})
  })

});

// FILTER BY LANGUAGE

app.post("/filterlanguage", function(req, res) {
  let filterLanguage = req.body.filterlanguage;
  snippetSchema.find({
    language: filterLanguage
  }).then(function(snippets) {
    res.render('home', {
      available: snippets
    });
  })
});

// FILTER BY TAG

app.post("/filtertagform", function(req, res) {
  let filtertag = req.body.filtertag;
  snippetSchema.find({
    tag: filtertag
  }).then(function(snippets) {
    res.render('home', {
      available: snippets
    });
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
