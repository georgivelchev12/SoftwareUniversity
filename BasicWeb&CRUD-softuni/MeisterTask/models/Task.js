const mongoose = require('mongoose');

let taskSchema =mongoose.Schema({

    title:{type: String, require: true},
    status:{type: String, require: true}
});

const Task = mongoose.model('Tasks',taskSchema);

module.exports = Task;