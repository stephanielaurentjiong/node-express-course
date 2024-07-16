const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({ //schema set the structure of all documents/data in collections. It is in key value pairs
    name : String, 
    completed : Boolean

})
module.exports = mongoose.model('Task', TaskSchema)
