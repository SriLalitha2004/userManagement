const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const userRoutes = require('./routes/userRoutes');
const managerRoutes=require('./routes/managerRoute')
const errorHandler = require('./middlewares/errorMiddleware');
const app=express()
app.use(express.json());
const port=process.env.port || 5000
dotenv.config()

//Mongodb connection
mongoose.connect(process.env.mongo_uri)
.then(()=>{
    console.log("mongodb connected succesfully")
}).catch((error)=>{
    console.log(`${error}`)
})

//Routes 
app.use('/', userRoutes);
app.use('/', managerRoutes);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server started running at ${port}`)
})