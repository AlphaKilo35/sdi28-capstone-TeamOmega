const express = require('express');
const router = express.Router();
const knex = require('../../knex');

// Fetch departures

// /Get
router.get('/', async (req,res) => {
  try {
    const departures = await knex('departure_tbl').select('*');
    res.status(200).json(departures);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departures '})
  }

});

router.get('/with-flights', async (req, res) => {
  try {
    const departuresWithFlights = await knex('departure_tbl')
      .leftJoin('flight_tbl', 'departure_tbl', 'flight_tbl.departure_id')
      .select('departure_tbl.*', 'flight_tbl.airframe', 'flight_tbl.date_time');
    res.status(200).json(departuresWithFlights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departures with flights'})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const departure = await knex('departure_tbl').where({ id }).first();
    if (departure) {
      res.status(200).json(departure);
    } else {
      res.status(404).json({ error: 'Departure not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departure' });
  }
});

// /Post
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const [id] = await knex('departure_tbl').insert({ name }).returning('id');
    res.status(201).json({ id, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create departure'})
  }
});

module.exports = router;