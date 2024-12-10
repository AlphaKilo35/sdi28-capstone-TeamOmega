const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);


// Fetch drop zones
router.get('/', async (req, res) => {
  try {
    const dropZones = await knex('drop_zone_tbl').select('*');
    res.status(200).json(dropZones);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drop zones' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dropZone = await knex('drop_zone_tbl').where({ id }).first();
    if (dropZone) {
      res.status(200).json(dropZone);
    } else {
      res.status(404).json({ error: 'Drop zone not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drop zone' });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const [id] = await knex('drop_zone_tbl').insert({ name }).returning('id');
    res.status(201).json({ id, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create drop zone' });
  }
});


// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await knex('drop_zone_tbl').where({ id }).update({ name });
    if (updated) {
      res.status(200).json({ id, name });
    } else {
      res.status(404).json({ error: 'Drop zone not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update drop zone' });
  }
});

// DELETE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await knex('drop_zone_tbl').where({ id }).update({ name });
    if (updated) {
      res.status(200).json({ id, name });
    } else {
      res.status(404).json({ error: 'Drop zone not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update drop zone' });
  }
});

module.exports = router;