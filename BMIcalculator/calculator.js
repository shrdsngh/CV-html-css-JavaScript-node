const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);

  var result = num1 + num2;

  res.send("Result of calculation is: " + result);
})

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmicalculator.html");
})

app.post("/bmicalculator", function(req, res) {

  var ht = Number(req.body.h);
  var wt = Number(req.body.w);

  var result = wt / (ht * ht);

  res.send("Your calculated BMI is: " + result + "<br> and Normal BMI range is 18.5 - 24.9");
})

app.listen(3000, function(){
  console.log("Server running @ port: 3000");
})
