const mongoose=require("mongoose");

function connectDb(){

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to DB")
    }).catch(error=>{
        console.log("Error connecting to DB")
        process.exit(1);
    })
}

module.exports=connectDb;