const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

//GET

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jumpLog = await knex('users_tbl as u')
    .join('manifest_tbl as m', 'u.id', 'm.user_id')
    .join('flight_tbl as f', 'm.flight_id', 'f.id')
    .join('departure_tbl as d', 'f.departure_id', 'd.id')
    .join('drop_zone_tbl as z', 'f.drop_zone_id', 'z.id')
    .select(
      'm.id as manifest id',
      'u.id as user_id',
      'u.name',
      'm.status',
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
    res.status(500).json({ error: 'Failed to fetch jump log'});
  }
});

//POST

router.post('/', async (req,res) => {
  const { user_id, flight_id, status, lift } = req.body;
  knex('manifest_tbl').returning('*').insert({user_id, flight_id, status, lift})
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log('Error manifesting user', err);
    res.status(500).json({ err: 'Failed to manifest user'});
  })
})

//UPDATE

router.patch('/:id', async (req, res) => {
  let manifestId = parseInt(req.params.id)
  const { status } = req.body;
  knex('manifest_tbl').where('id', manifestId).update('status', status).returning('*')
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log('Error updating manifest status', err);
    res.status(400).json({err: 'Failed to update manifest status'});
  })
})

//DELETE

router.delete('/:id', async (req, res) => {
  let manifestId = parseInt(req.params.id);
  knex('manifest_tbl').where('id', manifestId).del()
  .then(console.log(`Manifest ${manifestId}' deleted from database`))
  .catch(err => {
    console.log('Error deleting manifest entry', err);
    res.status(500).json({err: 'Failed to delete manifest entry'});
  })
})

module.exports = router;