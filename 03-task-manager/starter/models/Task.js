const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({ //schema set the structure of all documents/data in collections. It is in key value pairs
    name : {
        type: String,
        required: [true, 'msut provide name'],
        trim: true,
        maxlength : [20, 'name can not be more than 20 chars'],
    }, 
    completed : {
        type: Boolean,
        default: false,
    },

})
module.exports = mongoose.model('Task', TaskSchema)
