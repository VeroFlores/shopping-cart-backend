import express from 'express';
import cors  from "cors";
import dotenv from "dotenv";
import mysql from "mysql";

const app = express()
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

// La aplicación inicia un servidor y escucha las conexiones en el puerto 3000.
// arriba se define y acá se utiliza 

app.listen(app.get('port'), () => {
  console.log('server on port',app.get('port'))
})
const connection = mysql.createConnection({
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
    connection.query("SELECT * FROM category'",(err,result)=>{
      if (err) throw err;
      (response.json(result));
    })
  })
  app.get(`/product`, (request, response) => {
    const search = request.query.search;
    console.log(search);
    connection.query(`SELECT * FROM product WHERE name LIKE '%${search}%'`,(err,result)=>{
      if (err) throw err;
      (response.json(result));
    })
  })

