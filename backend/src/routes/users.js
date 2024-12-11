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

//POST

router.post('/', async (req, res) => {
    let { username, name, email, role, jm, password } = req.body;
    await knex('users_tbl').returning('*').insert({username, name, email, role, jm, password})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log('Failed to create user:', err);
        res.status(500).json({err: 'Failed to create user'})
    })
})

//UPDATE

router.patch('/:id', async (req, res) => {
    let userId = parseInt(req.params.id);
    let { role, jm } = req.body;
    await knex('users_tbl').where('id', userId).update('role', role).update('jm', jm).returning('*')
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log('Failed to fetch user:', err);
        res.status(400).json({err: 'Failed to fetch user'});
    })

})

//DELETE

router.delete('/:id', async (req, res) => {
    let userId = parseInt(req.params.id);
    try { 
        await knex('manifest_tbl').where('user_id', userId).del(); 
        const deletedCount = await knex('users_tbl').where('id', userId).del(); 
        if (deletedCount === 0) { 
            return res.status(404).json({ error: 'User not found' }); 
        }
        res.status(200).json({ message: `User with ID ${userId} has been deleted`})
    } catch (err) {
        console.log('Failed to delete user:', err);
        res.status(500).json({ error: 'Failed to delete user'})
    }
});

module.exports = router;