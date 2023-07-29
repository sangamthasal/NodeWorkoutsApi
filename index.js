const express = require('express');
const {connectMongodb} = require('./connection');
const {router} = require('./routes/workoutRoutes');
const path = require('path')


const app = express();

app.use("/assets",express.static('assets'))
app.use("/Styles",express.static('Styles'))
app.set("view engine" , "ejs");
app.set("views", path.resolve('./views'))

connectMongodb().then(console.log('database is connected')).then(
app.listen(2000,()=>{console.log('server is running')})
).catch((err)=>{console.log(err)})



app.use(express.urlencoded({extended:false}));


app.use("/workoutScheduler",router);



