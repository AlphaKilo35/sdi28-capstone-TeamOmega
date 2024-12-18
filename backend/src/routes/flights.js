// const express = require('express');
// const router = express.Router();
// const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);



// // GET
// router.get('/', async (req, res) => {
//   try {
//     const flights = await knex('flight_tbl as f')
//     .join('departure_tbl as d', 'f.departure_id', '=', 'd.id')
//     .join('drop_zone_tbl as z', 'f.drop_zone_id', '=', 'z.id')
//     .select(
//       'f.id as flight_id',
//       'f.airframe',
//       'f.type_load',
//       'f.type_tod',
//       'f.date_time',
//       'f.number_pax',
//       'f.number_passes',
//       'd.departure_name AS departure_name',
//       'z.dropzone_name AS drop_zone_name'
//     );
//     res.status(200).json(flights);
//   } catch (error) {
//     console.error('Error fetching flight detail:', error);
//     res.status(500).json({ error: 'Failed to fetch flight details' });
//   }
// });

// router.get('/dropzones', (req, res) => {
//   knex('drop_zone_tbl').select('*')
//     .then(data => res.send(data))
// })
// router.get('/departureAirfields', (req, res) => {
//   knex('departure_tbl').select('*')
//     .then(data => res.send(data))
// })

// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const manifest = await knex('manifest_tbl as m')
//       .join('users_tbl as u', 'm.user_id', 'u.id')
//       .select(
//         'm.id as manifest_id',
//         'm.flight_id',
//         'm.status',
//         'm.lift',
//         'u.name',
//         'u.email',
//         'u.role',
//         'u.jm'
//       )
//       .where('m.flight_id', id);

//      if (manifest.length === 0) {
//       res.status(404).json({ error: 'No manifest found for this flight' });
//      } else {
//       res.status(200).json(manifest);
//      }
//     } catch (error) {
//       console.error('Error fetching flight manifest:', error);
//       res.status(500).json({ error: 'Failed to fetch flight manifest'})
//     }

// });

// //POST
// router.post('/', (req, res) => {
//   console.log(req.body)
//   knex('flight_tbl').returning('*').insert(req.body)
//   .then(data => res.json(data))
//   .catch((err) => {
//     console.error(err);
//     res.status(404).send(err);
//   });
// })

// //UPDATE

// router.patch('/flights/:id', (req, res) => {
//   knex('flight_tbl').where('id', req.params.id).update(req.body).returning('*')
//   .then(data => {
//     res.json(data)
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(404).send(err);
//   });
// })

// //DELETE
// router.delete('/', (req, res) => {
//   knex('flight_tbl')
//     .where('id', req.body.id)

//     .del()
//     .then(res.send('it workd'))
//     .catch((err) => {
//       console.error(err);
//       res.status(404).send(err);
//     });
// })

// module.exports = router;

const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

// GET All Flights
router.get('/', async (req, res) => {
  try {
    const flights = await knex('flight_tbl as f')
      .join('departure_tbl as d', 'f.departure_id', '=', 'd.id')
      .join('drop_zone_tbl as z', 'f.drop_zone_id', '=', 'z.id')
      .select(
        'f.id as flight_id',
        'f.airframe',
        'f.type_load',
        'f.type_tod',
        'f.date_time',
        'f.number_pax',
        'f.number_passes',
        'd.departure_name AS departure_name',
        'z.dropzone_name AS drop_zone_name'
      );
    res.status(200).json(flights);
  } catch (error) {
    console.error('Error fetching flight detail:', error);
    res.status(500).json({ error: 'Failed to fetch flight details' });
  }
});

// GET Filtered Flights (NEW ENDPOINT)
router.get('/filtered-flights', async (req, res) => {
  const { date, time, platform } = req.query;

  try {
    // Base query
    let query = knex('flight_tbl as f')
      .join('departure_tbl as d', 'f.departure_id', '=', 'd.id')
      .join('drop_zone_tbl as z', 'f.drop_zone_id', '=', 'z.id')
      .select(
        'f.id as flight_id',
        'f.airframe',
        'f.type_load',
        'f.type_tod',
        'f.date_time',
        'f.number_pax',
        'f.number_passes',
        'd.departure_name AS departure_name',
        'z.dropzone_name AS drop_zone_name'
      );

    // Apply filters
    if (date) query.where(knex.raw('DATE(f.date_time)'), '=', date);
    if (time) query.where(knex.raw('TIME(f.date_time)'), '=', time);
    if (platform) query.where('f.airframe', '=', platform);

    const results = await query;
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching filtered flights:', error);
    res.status(500).json({ error: 'Failed to fetch filtered flights' });
  }
});

// GET Drop Zones
router.get('/dropzones', (req, res) => {
  knex('drop_zone_tbl')
    .select('*')
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// GET Departure Airfields
router.get('/departureAirfields', (req, res) => {
  knex('departure_tbl')
    .select('*')
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// GET Manifest by Flight ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const manifest = await knex('manifest_tbl as m')
      .join('users_tbl as u', 'm.user_id', 'u.id')
      .select(
        'm.id as manifest_id',
        'm.flight_id',
        'm.status',
        'm.lift',
        'u.name',
        'u.email',
        'u.role',
        'u.jm'
      )
      .where('m.flight_id', id);

    if (manifest.length === 0) {
      res.status(404).json({ error: 'No manifest found for this flight' });
    } else {
      res.status(200).json(manifest);
    }
  } catch (error) {
    console.error('Error fetching flight manifest:', error);
    res.status(500).json({ error: 'Failed to fetch flight manifest' });
  }
});

// POST a New Flight
router.post('/', (req, res) => {
  console.log(req.body);
  knex('flight_tbl')
    .returning('*')
    .insert(req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

// UPDATE a Flight by ID
router.patch('/flights/:id', (req, res) => {
  knex('flight_tbl')
    .where('id', req.params.id)
    .update(req.body)
    .returning('*')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

// DELETE a Flight by ID
router.delete('/', (req, res) => {
  knex('flight_tbl')
    .where('id', req.body.id)
    .del()
    .then(() => res.send('Flight deleted successfully'))
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
});

module.exports = router;
