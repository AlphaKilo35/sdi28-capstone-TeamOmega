const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);



router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jumpLog = await knex('users_tbl as u')
    .join('manifest_tbl as m', 'u.id', 'm.user_id')
    .join('flight_tbl as f', 'm.flight_id', 'f.id')
    .join('departure_tbl as d', 'f.departure_id', 'd.id')
    .join('drop_zone_tbl as z', 'f.drop_zone_id', 'z.id')
    .select(
      'u.id as user_id',
      'u.name',
      'f.id as flight_id',
      'f.airframe',
      'f.type_load',
      'f.type_tod',
      'f.date_time',
      'm.lift',
      'd.departure_name as departure_name',
      'z.dropzone_name as drop_zone_name'
    )
    .where('user_id', id);

    if (jumpLog.length === 0) {
      res.status(404).json({ error: 'No jump log found for this user '});
    } else {
      res.status(200).json(jumpLog);
    }
  } catch (error) {
    console.error('Error fetching jump log:', error);
    res.status(500).json({ error: 'Failed to fetch jump log'})
  }
});

module.exports = router;