const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser, updateUser } = require('../controllers/userController');

router.post('/create_user', createUser);
router.get('/get_users', getUsers);
router.delete('/delete_user/:user_id', deleteUser);
router.put('/update_user/:user_id', updateUser);

module.exports = router;