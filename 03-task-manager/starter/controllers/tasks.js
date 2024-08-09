const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')


 const getAllTasks =  asyncWrapper(async (req, res) => {
      const tasks = await Task.find({}) //{} means an empty obj
      res.status(200).json({ tasks })//if successful, send back the object with the property named tasks
 })

 const createTask = asyncWrapper(async (req, res) => {
      const task = await Task.create(req.body) //models Task.js schema
      res.status(201).json({ task }) //if successful, send back the object with the property named task
 })

 const getTask = asyncWrapper(async (req, res, next) => {
      const {id:taskID} = req.params //set id to taskId

      const task = await Task.findOne({ __id: taskID }) //rind a single document in 'tasks" collections where the '__id" field matches taskId

      if(!task){ //if task not found
         return next(createCustomError(`No task with id : ${taskID}`, 404))
         // return res.status(404).json({ msg:  `No task with id : ${taskID}`})
      }
      res.status(200).json({ task })
 })

 const deleteTask = asyncWrapper(async (req, res) => {
   
      const { id: taskID } = req.params
      const task = await Task.findOneAndDelete({ _id: taskID });
      if(!task){ //if task not found
         return next(createCustomError(`No task with id : ${taskID}`, 404))
         // return res.status(404).json({ msg: `No task with id : ${taskID}`})
      }   
      res.status(200).json({ task })
      // res.status(200).send()
      // res.status(200).json({ task: null, status: 'success' })
   
 })

 const updateTask = asyncWrapper(async (req, res) => {
      const { id : taskID } = req.params

      const task = await Task.findOneAndUpdate({ _id : taskID }, req.body, { //why need the req.body? cuz to update the data, we need to get the new value
         new: true, //option object
         runValidators: true, //validator
      })

      if(!task){ //if task not found
         return next(createCustomError(`No task with id : ${taskID}`, 404))
         // return res.status(404).json({ msg: `No task with id : ${taskID}`})
      }   
      res.status(200).json({ task })
   
 })

 module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
 }