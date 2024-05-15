import express from "express"
import cors from "cors"
import { connecBD } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import useRouter from "./routes/userRoute.js"
import 'dotenv/config'



//app config
const app=express()
const port= 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connecBD();
//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",useRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server Stared on http://localhost:${port}`)
})

//mongodb+srv://jorgelinavire:34155913@cluster0.kbhyhik.mongodb.net/?