const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const { Client } = require('pg');
const jsonParser = bodyParser.json();


const PORT = process.env.PORT || 3001;


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'snakedb',
  password: 'qweasdzxc12345',
  port: 5432
})

client.connect();

// client.query('SELECT * FROM leaderboard', (err, res) => {
//   console.log(err, res);
//   client.end();
// });


const app = express();

// app.use(cors);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
// }) 

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname+'../client/build/index.html'));
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/leaderboard", (req, res) => {
  client.query('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10', (err, result) => {
    if(err) {
      console.log(err + 'meh');
    }
    else {
      res.json(result.rows);
    }
    
  });
});

app.post("/gameover", jsonParser, (req, res) => {
  const player = req.body.player;
  const score = req.body.score;
  const query = {
    text: 'INSERT INTO leaderboard(nickname, score) VALUES($1, $2)',
    values: [player, score],
  }
  client.query(query, (err, res) => {
    if(err){
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
  // console.log(player,score);
  res.end("200");
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});