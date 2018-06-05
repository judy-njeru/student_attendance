let express = require('express');
let router = express.Router();
let app = express();
let bodyParser = require('body-parser');
const port = 3001;

// parse application/json
router.use(bodyParser.json());
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control, postman-token");
  next();
})
router.post('/kk', update);

function update(req, res) {
  console.log('updating-', req.body);
  res.sendStatus(200);
}
app.use(bodyParser.json());

app.route("/kk")

  .post((req, res)=>{
    console.log(req.body);
    res.end('{ "messages" : "wooohooo!" }');
  })
  .get((req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    console.log("þetta gerist þó...")
    res.end("kalli fór í bæjinn og kalli fór í búð");
  })

app.listen(port, ()=>{
  console.log("listening to port: " + port)
})
