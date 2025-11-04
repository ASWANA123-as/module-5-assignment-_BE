const express=require('express')
const router=express.Router()
const { authuser, authorizeRoles } = require('../middlewear/auth');
const taskcontroller=require("../controller/taskcontroller")
//create a task
router.post('/Addtask', authuser,taskcontroller.createTask)
router.get('/gettask',taskcontroller.getAlltask)
router.get('/getusertask', authuser, taskcontroller.getUserTask );
router.put('/updatetask/:id',taskcontroller.updatetask)
router.delete('/deletetask/:id',taskcontroller.deletetask)


module.exports=router

