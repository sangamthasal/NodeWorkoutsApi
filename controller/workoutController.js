const workoutModel = require('../model/workoutModel');
const mongoose = require('mongoose');

async function handleGetAllWorkout(req,res){


    let workoutcategory= req.query.category;
   if(workoutcategory){

    const q = workoutcategory.toLowerCase();
    console.log(q);
    const allcategoryworkout = await workoutModel.find({workoutCategory:q})

    console.log(allcategoryworkout)
    if(allcategoryworkout.length>0){
        
    return res.render('CategoryWorkout',{data:allcategoryworkout})
    }else{
        return res.json({msg:'no workout found for',q})
    }

   }else if(req.url== '/'){

    const allWorkout = await workoutModel.find({});
    return res.render('home',{data:allWorkout})

    }else if(req.url == '/MyWorkout'){

        return res.render('MyWorkout')

    }else if(req.url == '/createWorkout'){
        const allWorkout = await workoutModel.find({});
        return res.render('CreateWorkout',{data:allWorkout})

    }
}

async function handleCreateWorkout(req,res){

 
    const body = req.body;
    if(
       !body.workoutCategory || !body.workoutName || !body.sets || !body.reps || !body.howtoperform
    ){  

        return res.status(400).json({msg:'Please fill fields'});
    }
    
    const result = await workoutModel.create({
        workoutCategory:body.workoutCategory.toLowerCase(),
        workoutName: body.workoutName,
        sets: body.sets,
        reps: body.reps,
        howtoperform: body.howtoperform,
        descriptionanduse: body.descriptionanduse
    });
    
    
    return res.redirect('/workoutScheduler/createWorkout')
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
                
                const allWorkout = await workoutModel.find({})
                return res.redirect('/workoutScheduler/createWorkout');
                
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
        workoutCategory:req.body.workoutCategory || parseData.workoutCategory,
        workoutName:req.body.workoutName || parseData.workoutName,
        sets:req.body.sets || parseData.sets,
        reps:req.body.reps || parseData.reps,
        howtoperform:req.body.howtoperform || parseData.howtoperform,
        descriptionanduse:req.body.descriptionanduse || parseData.descriptionanduse
 })

    const alldata = await workoutModel.find({});
    
    return res.redirect('/workoutScheduler/createWorkout');
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