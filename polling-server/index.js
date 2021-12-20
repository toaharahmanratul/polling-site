const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
//require("dotenv").config();
const app = express();

const password = 'trratul01759875745';



const uri = "mongodb+srv://trratul:trratul01759875745@cluster0.c8iza.mongodb.net/polling-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})



app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('hello I am working')
})




client.connect(err => {
  const userCollection = client
  .db("polling-db")
  .collection("user");
  const pollCollection = client
  .db("polling-db")
  .collection("polls");
  const voteCollection = client
  .db("polling-db")
  .collection("votes");


  app.post("/sign-up",(req, res) => {

    userCollection.insertOne(req.body)
    .then(result => {
      console.log(result);
      res.send(result.insertedCount > 0)
    })
    
    console.log(req.body) 
    // res.send("coming")

  })



  app.get("/allUsers", (req, res) => {

    userCollection.find({}).toArray((err, documents) => {
      res.send(documents); 
    });
  });

  app.post("/addPoll",(req, res) => {

    pollCollection.insertOne(req.body)
    .then(result => {
      console.log(result);
      res.send({isDone:result.insertedCount, pollId: result.insertedId})
    })
    
    console.log(req.body) 

  })

  app.get("/allPolls", (req, res) => {

    pollCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });


  app.post("/vote",(req, res) => {

    voteCollection.insertOne(req.body)
    .then(result => {
      console.log(result);
      res.send(result.insertedCount > 0)
    })
    
    // console.log(req.body) 
    // res.send("coming")

  })


  app.get("/allVotes", (req, res) => {

    voteCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.listen(8080);