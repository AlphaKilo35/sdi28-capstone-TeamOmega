const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const route = require('./routes/routes.js)
const knex = require('knex')(require('../knexfile.js')['development'])

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.Router());
app.use(cookieParser());

//Routes



//General | Root Route
app.get("/", (req, res) => {
  res.send("Express API Application is up and running")
})

//Flight Route
//Create entry
app.post('/flights/:id', (req, res) => {
  let {id, airframe, number_pax, dropzone, departure_area, date, time} = req.body
  knex('flight_tbl').returning('*').insert({id, airframe, number_pax, dropzone, departure_area, date, time})
  .then(data => {
    let flightId = data.map(flight => flight.id)
    res.json(flightId)
  })
})
//Read entries
app.get('/flights', (req,res)=>{
  knex('flight_tbl').select('*')
  .then(data => res.json(data))
})
//Update entries
app.patch('/flights/:id', (req, res) => {
  knex('flight_tbl').where('id', req.params.id).update(req.body).returning('*')
  .then(data => {
    res.json(data)
  })
})
//Delete entries
app.delete('/flights/:id', (req, res) => {
  knex('flight_tbl')
    .where('id', req.params.id)
    .del()
    .then(res.send('it workd'))
})




module.exports = app;