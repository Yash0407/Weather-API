const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "58d850f84be61632d68a854b4ec07cea";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey + "&units=" +units;

    https.get(url, function(response){
      console.log(response.statusCode);
      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const feels = weatherData.main.feels_like;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
        res.write("<h1>Temperature in "+ query +" is "+ temp+ " </h1>");
        res.write("<h3>Feels like: "+ feels+ "</h3>");
        res.write("<h4>"+ description + "</h4>");
        res.write("<img src="+ imgURL+ ">");
        res.send();
      });
    });
});

app.listen("3000", function(){
  console.log("Server at port 3000 started.");
});
