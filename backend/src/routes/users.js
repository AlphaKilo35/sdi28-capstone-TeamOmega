const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

//GET

router.get('/:id', async (req, res) => {
    let userId = parseInt(req.params.id);
    await knex('users_tbl').where('id', userId).returning('id', 'username', 'name', 'role', 'jm', 'email')
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log('Failed to fetch user:', err);
        res.status(400).json({err: 'Failed to fetch user'});
    })
})

router.get('/', async (req, res) => {
    await knex('users_tbl as u')
    .join('manifest_tbl as m', 'u.id', 'm.user_id')
    .join('flight_tbl as f', 'm.flight_id', 'f.id')
    .join('departure_tbl as d', 'f.departure_id', 'd.id')
    .join('drop_zone_tbl as z', 'f.drop_zone_id', 'z.id')
    .select(
        'u.id as user_id',
        'u.name as name',
        'u.role as role',
        'u.rm as rm',
        'u.email as email',
        'm.id as manifest_id',
        'm.status as status',
        'm.lift as lift',
        'f.id as flight_id',
        'f.airframe as airframe',
        'f.type_tod as type_tod',
        'f.type_load as type_load',
        'f.date_time as date_time',
        'f.number_pax as number_pax',
        'f.number_passes as number_passes',
        'd.departure_name as departure_name',
        'z.dropzone_name as dropzone_name'
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log('Failed to fetch unit data:', err);
        res.status(400).json({err: 'Failed to fetch unit data'})
    })
})

module.exports = router;