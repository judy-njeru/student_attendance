
const express = require('express');
const router = express.Router();
const app = express();
const MongoClient = require('mongodb').MongoClient();
const mongoURL = "mongodb://localhost:27017/MyDatabase";
const port = 3001;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control, postman-token, Access-Control-Allow-Origin");
  next();
})


let attData = { data: []};

MongoClient.connect(mongoURL, function(err, MyDatabase) {
  if (err) throw err;
  MyDatabase.collection("attendance").find({}, function(err, result) {
    if (err) throw err;
    result.toArray().then(result=>{
        attData = result;
    });
    MyDatabase.close();
  });
});


//GET api/att
app.get("/api/att",(req, res)=>{
  res.end(JSON.stringify(attData));
})

//create new user in the database
app.post("/api/createuser",(req, res)=>{
  MongoClient.connect(mongoURL, function(err, MyDatabase) {
    if (err) throw err;
    MyDatabase.collection("students").findOne({name:req.body.name}, (err, res)=>{
      if(!res){
        var myobj = req.body;
        MyDatabase.collection("students").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          MyDatabase.close();
        });
      }

    });
  });
})


//GET api/attInfo from attendanceInfo collection



app.get("/api/attInfo",(req, res)=>{

  MongoClient.connect(mongoURL, function(err, MyDatabase) {
    if (err) throw err;
    MyDatabase.collection("attendanceInfo").find({}, function(err, result) {
      if (err) throw err;
      result.toArray().then(result=>{

          res.end(JSON.stringify(result));
      });
      MyDatabase.close();
    });
  });

})


MongoClient.connect(mongoURL, function(err, MyDatabase) {
  if (err) throw err;
  MyDatabase.collection("attendanceInfo").find({}, function(err, result) {
    if (err) throw err;
    result.toArray().then(result=>{
        attInfoData = result;
        console.log(attInfoData);
    });
    MyDatabase.close();
  });
});

//create new user in attendance in the database
app.post("/api/create/attuser",(req, postres)=>{
  MongoClient.connect(mongoURL, function(err, MyDatabase) {
    if (err) throw err;
      var myobj = req.body;
      MyDatabase.collection("attendanceInfo").findOne({date:req.body.date, userId:req.body.userId}, (err, res)=>{
        if(!res){
          MyDatabase.collection("attendanceInfo").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            postres.end("thank you for registering");
            MyDatabase.close();
          });
        }
      });
    });
})



app.listen(port, ()=>{
  console.log("listening to port: " + port)
})
