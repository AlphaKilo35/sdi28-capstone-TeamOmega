const express = require('express');
const router = express.Router();
const knex = require('../../knex');

// GET all flights
router.get('/', async (req, res) => {
  try {
    const flights = await knex('flight_tbl').select('*');
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});

// GET flight by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await knex('flight_tbl').where({ id }).first();
    if (flight) {
      res.status(200).json(flight);
    } else {
      res.status(404).json({ error: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flight' });
  }
});

module.exports = router;