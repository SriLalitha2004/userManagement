const express = require('express');
const router = express.Router();
const {createManager}=require('../controllers/managerController')

router.post('/create_manager', createManager);

module.exports=router