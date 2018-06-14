const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dbPath = require('./db/dbPath');

var db;

MongoClient.connect(dbPath.mongo, (err, client) => {
  if (err) return console.log(err)
  db = client.db('poems')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'pug')
app.set('views', './views')

app.use("/static", express.static("public"))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

//   app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('poems').find().toArray((err, result) => {
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
  res.render('add.pug')
})

// ---
// pp.get('/test/:name', function (req, res) {
//   res.render('index', { title: 'Hey name', message: `Hello ${req.params["name"]}!` }
// ---

// выводит стих по id orderNumber
var ObjectID = require('mongodb').ObjectID;

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const details = {
    '_id': new ObjectID(id)
  };
  db.collection('poems').find(details).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('card.pug', {
      mongo: result
    })
    // res.send(result)
    // console.log(result)

  })
})


app.post('/add', (req, res) => {
  console.log(req.body)
  db.collection('poems').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

// сохраняет в базу

// router.post("/posts", (req, res)=>{
//   const post  = new db.Post(req.body)
//   post.save(function(err){
//     res.json(err)
//   }) 
// })