const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/snippetdb');
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const snippetSchema = require('./models/snippet')
const userDataSchema = require('./models/userinfo')
const app = express();

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

app.use(function(req, res, next) {
  console.log('in interceptor');
  if (req.url === '/login') {
    next()
    console.log(1);
  } else if (req.url === '/registration') {
    next()
    console.log(4);
  } else if (!req.session.username) {
    console.log(2);
    res.render('login')

  } else {
    console.log(3);
    next()
  }
})
// manually add user to db
// const unicorn = new userDataSchema({
// username: "kitty",
//   password:"unicorn",
//
// })
//
// unicorn.save()
//   .then(function() {
//     return userDataSchema.find()
//   })

// HOME PAGE - with list of snippets
app.get('/', function(req, res) {
  snippetSchema.find().then(function(snippets) {
    res.render('home', {
      available: snippets
    });

  })

});

// FOLLOW LINK TO SNIPPET DETAILS

app.get('/snippet/:id', function(req, res) {
  snippetSchema.findOne().where({
    _id: (req.params.id)
  }).then(function(snippet) {
    res.render('snippet', {
      available: snippet
    })
  })
  console.log(req.params.id);
});

// LOGIN PAGE
app.post('/login', function(req, res) {
  userDataSchema.findOne().where({
      username: req.body.username,
      password: req.body.password
}) .then(function(results){
    console.log(results);
    if (results !== null){
      req.session.username = req.body.username;
    }
  if (req.session.username === req.body.username) {
    snippetSchema.find().then(function(snippets) {
      res.render('home', {
        available: snippets
      });
      console.log("correct Password");
    })
  } else {
    res.render('login', {
      error: "Incorrect username or password."
    });
    console.log("wrong password");
  }
})
})
// link to registration page
app.get('/registration', function(req, res) {
    res.render('registration')
});

// REGISTRATION PAGE

app.post('/registration', function(req, res) {
  // if (req.body.regpassword === req.body.confirmpassword) {
    const newUser = new userDataSchema({
      username: req.body.username,
      password: req.body.regpassword
    })
    newUser.save()
    .then(function(){
      return snippetSchema.find()
    })
      .then(function(snippets) {
        res.render('home', {
          available: snippets
        });
      })
// } else {
//   res.render('registration',{passerror: "Password does not match."})
// }
})

// ADD SNIPPET

app.post("/add", function(req, res) {
  let newTitle = req.body.title;
  let newBody = req.body.body;
  let newDetail = req.body.detail;
  let newLanguage = req.body.language;
  let newTag = req.body.tag.split(", ");

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
  snippetSchema.deleteOne().where({
      _id: (req.params.id)
    })
    .then(function() {
      return snippetSchema.find()
    })
    .then(function(snippet) {
      res.render('home', {
        available: snippet
      })
    })

});

// EDIT SNIPPET PAGE
app.get("/edit/:id", function(req, res) {
  snippetSchema.findOne().where({
    _id: (req.params.id)
  }).then(function(snippet) {
    res.render('edit', {
      available: snippet
    })
  })
  console.log(req.params.id);
});



// get a specific snippet (id page)
    app.get('/snippet/:id', function(req, res) {
      snippetSchema.findOne().where({
        _id: (req.params.id)
      }).then(function(snippet) {
        res.render('snippet', {
          available: snippet
        })
      })
      console.log(req.params.id);
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
