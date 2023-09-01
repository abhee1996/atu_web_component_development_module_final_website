var mysql = require('mysql2');


// Setup MySQL connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'abdullah',
  password : 'grOoMpKi8278',
  database : 'worldcup2022',
  // timezone: 'utc+0'  
});

db.connect(function(err){
	if(err) throw err;
	console.log(`Sucessfully connected to MySQL database teamsDB`);
});
module.exports = db
