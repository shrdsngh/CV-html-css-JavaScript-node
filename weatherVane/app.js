const express = require("express");
const https = require("https");                   //https is a native node module used to bring API in action.
const bodyParser = require("body-parser");        //used to parse the input from user.

const app = express();

app.use(bodyParser.urlencoded({extended: true})); //this method allows us to tap in the user input.

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");       //res.sendFile method is used to get files from server side.
})


app.post("/", function(req, res){
   const query = req.body.cityName;              //tapping into user's given input using body-parser.
   const apiKey = "080f5b7d482f7cacaff2dad258eec687";
   const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;

   https.get(url, function(respo){                   //URL is the link to the API with all parameters.
     console.log(respo.statusCode);                  //statusCode tells whether API is responding or not.

     respo.on("data", function(data){                //This gives data in hexadecimal Code.
       const weatherData = JSON.parse(data);         //This parses data in JSON so we can easily manipulate the data.
       const icon = weatherData.weather[0].icon;
       const imageURL =  "https://openweathermap.org/img/wn/" + icon + "@2x.png"
       console.log(weatherData.main.temp);
       console.log(weatherData.name);
       console.log(weatherData.weather[0].description);
       console.log(weatherData.main.humidity);
       console.log(icon);
       res.write("<h1>The temperature in <em>"+ query +"</em> is " + weatherData.main.temp + " degrees Celsius.</h1>");
       res.write("<p>and the weather is currently " + weatherData.weather[0].description + "</p>");
       res.write("<img src=" + imageURL + ">");
       res.send();                                  //res.send() request can only be used once in any get method.
     })                                             //res.write() can be used multiple times.
   })
})


app.listen(3000, function(){
  console.log("Server started at port: 3000");
})
