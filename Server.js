import express from "express";
import mongoose from "mongoose";
const app=express();
import Textroute from './Routes/Textroute.js';
import authroute from './Routes/authroute.js';
import inventoryroutes from './Routes/inventoryroutes.js'
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from "morgan";
import cors from 'cors';
import Analyticroutes from './Routes/Analyticroutes.js'
import AdminRoutes from './Routes/AdminRoutes.js'
dotenv.config();
const Mongodb = "mongodb+srv://Teja:teja@cluster1.lgo3ddb.mongodb.net/Blood?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"welcome"

//     })
// })
app.use('/',Textroute)
app.use(authroute);
app.use(inventoryroutes)
app.use(Analyticroutes)
app.use(AdminRoutes)
const PORT=process.env.PORT || 8080;
mongoose.connect(Mongodb)
.then(()=>{
console.log("connected");
app.listen(PORT,()=>{
    console.log(`server running in ${process.env.Dev_Mode} running Port ${process.env.PORT}`.bgBlue.white);
});
})
.catch((error)=>{
console.log(`error ${error}`);
})


// 







