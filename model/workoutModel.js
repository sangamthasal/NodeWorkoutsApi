const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
    {
        workoutCategory:{
            type:String,
            required:true
        },
        workoutName:{
            type:String,
            required:true
        },
        sets:{
            type:Number,
            required:true
        },
        reps:{
            type:Number,
            required:true
        },
        howtoperform:{
            type:String,
            required:true
        },
        descriptionanduse:{
            type:String,
            required:true
        },
    
    },
    {timestamps:true}
);

const workoutModel = mongoose.model("workouts",workoutSchema);

module.exports = workoutModel;