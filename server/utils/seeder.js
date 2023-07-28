const User = require('../models/userModel');
const dotenv = require('dotenv');
const connectDataBase = require('../config/database')
const data = require('../data.json')

dotenv.config({path:'config/config'});

connectDataBase()

const seedProducts=async ()=>{
    try {
        await User.deleteMany();
        console.log("Deleting all users");

        await User.insertMany(data)
        console.log("adding all products from file");
        
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

seedProducts()