const express = require('express');
const {handleGetAllWorkout,handleCreateWorkout,handleGetWorkoutById,handleDeleteWorkoutById,handleUpdateWorkoutById,handleGetEditPage} = require('../controller/workoutController');

const router = express.Router();


router.get("/",handleGetAllWorkout);

router.route("/createWorkout").get(handleGetAllWorkout).post(handleCreateWorkout);

router.get("/Myworkout",handleGetAllWorkout);

router.post("/Delete/:id",handleDeleteWorkoutById)

router.route("/Edit/:id").get(handleGetEditPage).post(handleUpdateWorkoutById);

router.get("/:id",handleGetWorkoutById);

module.exports={
    router
}