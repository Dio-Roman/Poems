const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('...', (err, client) => {
    if (err) return console.log(err)
    db = client.db('poems') 
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
  })

  app.set('view engine', 'pug')
  app.set('views', './views')

  app.use("/static", express.static("public"))
  
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

//   app.use(express.static('public'))

  app.get('/', (req, res) => {
  db.collection('poems').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.pug', {mongo: result})
    
    // res.send(result)
    // console.log(result)
  })
})


  app.post('/', (req, res) => {
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