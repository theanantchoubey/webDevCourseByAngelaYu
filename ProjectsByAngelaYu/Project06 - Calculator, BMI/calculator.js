const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);
  var result = num1 + num2;
  res.send("Result of the Calculation is " + result);
});

app.get('/bmiCalculator', function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function (req, res){
  var w = parseFloat(req.body.weight);
  var h = parseFloat(req.body.height);
  var n = w/(h*h);
  res.send("Your BMI is " + n);
  
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});