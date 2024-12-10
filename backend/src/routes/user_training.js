const express = require('express');
const userRouter = express.Router();
const { getUserData } = require('../controllers/userController')

userRouter.get('/:id', getUserData)

module.exports = userRouter;