
const express     = require("express");
const app         = express();
const cors        = require("cors");
const pokemonFile = require("./first_30_pokemon.json");
const mongoose    = require("mongoose");

app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://brad:abcd1234@cluster0.vcuj9.mongodb.net/timelineDB?retryWrites=true&w=majority",
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }
);

let db = mongoose.connection;

const schema = new mongoose.Schema({
  type: String,
  word: String,
  date:Object,
  likes: Number
})

const timeLineModel = mongoose.model("timeline", schema); // incase schema goes here

db.once('open', function () {
  console.log('Connection was succesfull');
})

app.use(cors({
  origin:"http://localhost:5000"
}))
app.listen(process.env.PORT || 7000, function (err) {
  if (err) console.log(err);
});

app.get("/database",cors(), (req,res) => {
   timeLineModel.find({}, (err,users) =>{
    res.send(users);
  })
})

app.get("/:id", cors(), (req, res, next) => {
  let id = req.params.id
  req.header("Content-Type","application/json")
  res.send(JSON.stringify(pokemonFile[id]));

   console.log(JSON.stringify(pokemonFile[id].name));
})


app.get("/", (req,res,next) => {
  res.send("request recieved");
})

app.post("/user/:id",cors(), (req,res,next) => {
})

console.log("Server Running");
