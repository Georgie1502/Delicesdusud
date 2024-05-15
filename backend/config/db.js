import mongoose
 from "mongoose";

export const connecBD= async ()=>{
    await mongoose.connect('mongodb+srv://jorgelinavire:34155913@cluster0.kbhyhik.mongodb.net/delicesdusud').then(()=>{
        console.log("DB connected");
    })
 }