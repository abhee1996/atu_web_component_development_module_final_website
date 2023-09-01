var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
// 
var app = express();

// serves files in public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//CORS
app.use(cors());
app.options("*", cors);

//Routers
//team routes
var teamsRoute = require('./routers/teams');
app.use("/api/qatarwc22", teamsRoute);
//player routes
var playersRoute = require('./routers/players');
app.use("/api/qatarwc22", playersRoute);
//todayMatch routes
var todayMatchRoute = require('./routers/todayMatches');
app.use("/api/qatarwc22", todayMatchRoute);
//fixture routes
var fixtureRoute = require('./routers/fixture');
app.use("/api/qatarwc22", fixtureRoute);
//Standing routes
var StandingRoute = require('./routers/Standing');
app.use("/api/qatarwc22", StandingRoute);
//win-results routes
var resultsRoute = require('./routers/matchResults');
app.use("/api/qatarwc22", resultsRoute);
//auth routes
var authRoute = require('./routers/auth');
app.use("/api/qatarwc22", authRoute);
//admin routes
var adminRoute = require('./routers/admin');
app.use("/api/qatarwc22", adminRoute);
 
var myServer = app.listen(3005, function() {
  console.log("Server listening on port 3005");
});