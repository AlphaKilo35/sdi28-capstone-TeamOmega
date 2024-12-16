const knex = require('../../knex')

const getUserData = async (req, res) => {
  try{
    let data = await knex('users_tbl').where('id',req.params.id).first();
    if (!data) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.status(200).json(data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error - Querying User Training Data' });
  }
};

module.exports =  { getUserData };