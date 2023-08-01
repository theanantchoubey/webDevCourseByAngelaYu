const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req, res){
    const query  = req.body.cityName;
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const unit = "metric";
    const  url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey +"&units="+ unit ;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/' + icon +'@2x.png'
            res.send(`<h3>The weather is currently ${weatherData.weather[0].description} </h3>
            <h1>The temperature in ${query} is  + ${temp} degree Celcius.</h1>
            <img src=" ${imageURL}">`);
            console.log(icon);  
        });
    });
});



app.listen(3000, function(){
    console.log("Server is running on Port 3000");
});

