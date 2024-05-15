import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true,unique:true},
    description:{type:String,required:true},
    price:{type:Number,require:true},
    activated:{type:Boolean},
    image:{type:String,require:true},
    category:{type:String,require:true}
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;