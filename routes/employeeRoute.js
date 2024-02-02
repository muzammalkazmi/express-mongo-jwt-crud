const express = require('express')
const router = express.Router
const employeeController =require('../controllers/employeeController')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, employeeController.index)
router.post('/show', authenticate, employeeController.show)
router.post('/add', authenticate, employeeController.add)
router.post('/update', authenticate, employeeController.update)
router.post('/delete', authenticate, employeeController.destroy)

module.exports= router