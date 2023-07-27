const workoutModel = require('../model/workoutModel');
const mongoose = require('mongoose');

async function handleGetAllWorkout(req,res){

    if(req.url== '/'){
    const allWorkout = await workoutModel.find({});
    return res.render('home',{data:allWorkout})
    }else if(req.url == '/MyWorkout'){
        return res.render('MyWorkout')
    }else if(req.url == '/createWorkout'){
        return res.render('CreateWorkout')
    }
}

async function handleCreateWorkout(req,res){

 
    const body = req.body;
    if(
        !body.workoutName || !body.sets || !body.reps || !body.howtoperform
    ){  

        return res.status(400).json({msg:'Please fill fields'});
    }
    
    const result = await workoutModel.create({
        workoutName: body.workoutName,
        sets: body.sets,
        reps: body.reps,
        howtoperform: body.howtoperform,
        descriptionanduse: body.descriptionanduse
    });
   
    return res.render('CreateWorkout')
}

async function handleGetWorkoutById(req,res){

    const byId =mongoose.isValidObjectId(req.params.id);

        if(byId){
            const result = await workoutModel.findById(req.params.id);
            if(result){

                        return res.json({status:'success',data:result})
                       
            }else{
                return res.json({message:'no data found'})
            }
            
    }else{
        return res.json({message:'not valid id or name'})
    }
}

async function handleDeleteWorkoutById(req,res){
  
    const yesorno =mongoose.isValidObjectId(req.params.id);
 
    
        if(yesorno){
        const result = await workoutModel.findByIdAndDelete(req.params.id);
       
        
            if(result){
           
                return res.redirect('/workoutScheduler')
                
            }
            else{
                return res.json({message:'no data found'})
            }
        }else{
             return res.json({message:'not valid id'})
        }
}

async function handleUpdateWorkoutById(req,res){

 
    const yesorno = mongoose.isValidObjectId(req.params.id);

    if(yesorno){
      
    const olddata = await workoutModel.findById(req.params.id);
    const parseData = JSON.parse(JSON.stringify(olddata));
    

    const result = await workoutModel.findByIdAndUpdate(req.params.id, {  
        workoutName:req.body.workoutName || parseData.workoutName,
        sets:req.body.sets || parseData.sets,
        reps:req.body.reps || parseData.reps,
        howtoperform:req.body.howtoperform || parseData.howtoperform,
        descriptionanduse:req.body.descriptionanduse || parseData.descriptionanduse
 })

    const alldata = await workoutModel.find({});
      
    return res.render('home',{data:alldata})
  }
  else{
    return res.json({message:'not valid id'})
  }
}


async function handleGetEditPage(req,res){

    const isvalid = mongoose.isValidObjectId(req.params.id)
    
    if(isvalid){
        const olddata = await workoutModel.findById(req.params.id)
        if(olddata){

            const sendtoForm =JSON.parse(JSON.stringify(olddata));
            return res.render('EditWorkout',{data:sendtoForm})

        }else{
            return res.json({message:'no data found'})
        }
    }
}

module.exports={handleGetAllWorkout,handleCreateWorkout,handleGetWorkoutById,handleDeleteWorkoutById,handleUpdateWorkoutById,handleGetEditPage};