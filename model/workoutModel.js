const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
    {
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
        },
    
    },
    {timestamps:true}
);

const workoutModel = mongoose.model("workouts",workoutSchema);

module.exports = workoutModel;