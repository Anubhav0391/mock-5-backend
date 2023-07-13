const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    department: String,
    salary: Number
},{
    versionKey: false
})

const employeeModel=mongoose.model("employee", userSchema);

module.exports={employeeModel};