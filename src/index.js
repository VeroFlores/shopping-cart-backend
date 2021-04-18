const express = require('express')
const app = express()
var cors = require('cors')
// const database = require('./database');
const dotenv=require('dotenv');
var mysql      = require('mysql');
dotenv.config()
app.use(cors());
// setting
// es como crear variable es como const port=3000
// process.env sirve decir que si un servicio en la nube no da puerto se toma en todo caso usar 3000
app.set('port',process.env.PORT || 3000);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Middlewares
// funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación
// si recibimos un json el modulo de express será capaz de entenderlo
app.use(express.json());
//Routes

// La aplicación inicia un servidor y escucha las conexiones en el puerto 3000.
// arriba se define y acá se utiliza 

app.listen(app.get('port'), () => {
  console.log('server on port',app.get('port'))
})
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
app.get('/allProducts', (request, response) => {
  connection.query("SELECT * FROM product",(err,result)=>{
    if (err) reject(err);
    (response.json(result));
  })
})
app.get('/category', (request, response) => {
  connection.query("SELECT * FROM product WHERE category LIKE '%1%'",(err,result)=>{
    if (err) throw err;
    (response.json(result));
  })
})
app.get('/product', (request, response) => {
  connection.query("SELECT * FROM product WHERE name LIKE '%COCA%'",(err,result)=>{
    if (err) throw err;
    (response.json(result));
  })
})
  // connection.query('SELECT name FROM product', (error, result) => {
  //     if (error) throw error;

  //     response.send(result);

  // });
// app.get('/json', function (req, res) {
//   connection.connect();  
 
//   connection.query('SELECT name FROM product', function(err, rows, fields)   
//   {  
//       connection.end();
 
//       if (err) throw err;  
 
//       res.json(rows); 
 
//   });
// });
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });

