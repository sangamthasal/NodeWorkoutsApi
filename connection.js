require('dotenv').config();
const mongoose = require('mongoose');

async function connectMongodb(){

 return mongoose.connect(process.env.databaseUrl);

}

module.exports ={
    connectMongodb
}