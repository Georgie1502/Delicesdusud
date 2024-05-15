import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    admin:{type:Boolean,require:true},
    activated:{type:Boolean},
    image:{type:String},
   
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;