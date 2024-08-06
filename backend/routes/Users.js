const express = require('express');
const { fetchUserById, updateUser, fetchAllUsers } = require('../controller/User');

const router = express.Router();
//  /users is already added in base path
router.get('/own', fetchUserById)
      .patch('/:id', updateUser)
      .get('/users', fetchAllUsers);
exports.router = router;
