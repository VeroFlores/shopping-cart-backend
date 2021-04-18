const dotenv=require('dotenv');
var mysql      = require('mysql');
dotenv.config()
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  database :process.env.DB_DATABASE,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
//   connection.query('SELECT name FROM product', function (err, result) {
//     if (err) throw err;
  
//     // Bucle que recore los resultados y pinta en consola.
//     for(i=0; i<result.length; i++){
//       console.log("Result: " + result[i].name);
//     }
   
//   });
  // connection.end();
  const getProducts=(res)=>{
    connection.query('SELECT name FROM category',(err,result)=>{
      if (err) reject(err);
      (resolve(result));
    })
      }

