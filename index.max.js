const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const dbPath = require('./db/dbPath');
const fs = require("fs");
const multer = require("multer");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user');
const sharp = require('sharp');

var db = mongoose.connect(dbPath.auth);

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    // mongooseConnection: db
    url: dbPath.auth
  })
}));



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
const upload = multer({storage: storage});

var dbase;

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

MongoClient.connect(dbPath.mongo, (err, client) => {
  if (err) return console.log(err)
  dbase = client.db('poems')
  // app.listen(port, () => {
  //   console.log('listening on 3000')
  // })
})

app.listen(port, () => {
  console.log('listening on 3000')
})

app.set('view engine', 'pug')
app.set('views', './views')
app.use("/static", express.static("public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });

app.get('/', (req, res) => {
  dbase.collection('poems').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.pug', {
      mongo: result
    })

    // res.send(result)
    // console.log(result)
  })
})

app.get('/about', (req, res) => {
  res.render('about.pug')
})

app.get('/add', (req, res) => {
  dbase.collection('poems').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('add.pug', {
      countPoems: result.length
    })
  })
})

// выводит стих по id orderNumber
const ObjectID = require('mongodb').ObjectID;

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const details = {
    '_id': new ObjectID(id)
  };
  dbase.collection('poems').find(details).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('card.pug', {
      mongo: result
    })
    // res.send(result)
    // console.log(result)
  })
})

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in my form */),
  (req, res, cb) => {
    let width = 208;
    sharp(req.file.path).resize(width).toFile(`public/img/small-${req.file.originalname}`)
    // res.send(req.files)

    dbase.collection('poems').save(req.body, (err, result) => {
      if (err) return console.log(err);
      res.redirect('/')
    })
  }
);

//  без названия - мелкая картинка не нужна
app.post(
  "/uploadone",
  upload.single("file" /* name attribute of <file> element in my form */),
  (req, res, cb) => {
    // res.send(req.files)

    dbase.collection('poems').save(req.body, (err, result) => {
      if (err) return console.log(err);
      res.redirect('/')
    })
  }
);

// app.post('/add', (req, res) => {
//   console.log(req.body)
//   db.collection('poems').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//     res.redirect('/')
//   })
// })

// -----------login---------------
app.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  // if (req.body.email &&
  //   req.body.username &&
  //   req.body.password &&
  //   req.body.passwordConf) {

  //   var userData = {
  //     email: req.body.email,
  //     username: req.body.username,
  //     password: req.body.password,
  //     passwordConf: req.body.passwordConf,
  //   }

  //   User.create(userData, function (error, user) {
  //     if (error) {
  //       return next(error);
  //     } else {
  //       req.session.userId = user._id;
  //       return res.redirect('/profile');
  //     }
  //   });

  // } else 
  if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/add');
        // return document.querySelector('.tp').style.display ='none';
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

app.get('/logout',  function (req, res, next)  {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
