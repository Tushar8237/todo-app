import mongoose from "mongoose";


// Define the task schema
const taskSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },

    name : {
        type : String,
        required : [true, "Please add a task name"],
        trim : true,
    },

    description : {
        type : String,
        trim : true,
    },

    status : {
        type : String,
        enum : ['PENDING', 'DONE'],
        default : 'PENDING',
    },
}, {timestamps : true});


const Task = mongoose.model('Task', taskSchema);

export default Task;