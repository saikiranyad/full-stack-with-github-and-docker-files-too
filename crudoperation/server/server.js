require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const taskrouter = express.Router()


const connectdb = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb is connected")

    }catch(err){
        console.log("mongodb is not connected due to this error",err)
    }
}

const taskschema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    }
},{timestamps:true})

const Task = mongoose.model("Task",taskschema)

taskrouter.post('/add',async(req,res)=>{
    try{
        const {task} = req.body
        if(!task){
            return res.status(404).json({success:false,message:"name not found"})
        }
        const newtask = new Task({task})
        await newtask.save()
        return res.status(201).json({success:true,message:"added task successfully",task})
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"Internal Server Error in add api",err})
    }
})

taskrouter.get('/get',async(req,res)=>{
    try{
        const alltasks = await Task.find({})
        if(!alltasks){
            return res.status(404).json({success:false,message:"there is no tasks"})
        }
        return res.status(201).json({success:true,message:"all tasks is fetched",alltasks})


    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"Internal Server Error",err})
    }
    
})

taskrouter.put('/edit/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const {task} = req.body
        console.log(task)
        const taskdata = await Task.findById(id)
        if(!taskdata){
            return res.status(404).json({success:false,message:"task not found"})
        }
        const editedtask = await Task.findByIdAndUpdate(id,{task},{new:true})
        return res.status(201).json({success:true,message:"task edited successfully",editedtask})

    }catch(err){
        return res.status(500).json({success:false,message:"Internal Server Error",err})
    }
})

taskrouter.delete('/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const task = await Task.findById(id)
        if(!task){
            return res.status(404).json({success:false,message:"doesnt found the task"})
        }
        const deletedtask = await Task.findByIdAndDelete(id)
        return res.status(201).json({success:true,message:"task deleted successfully",deletedtask})

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"Internal Server Error in task deleted",err})
    }
})
taskrouter.get('/get/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const task = await Task.findById(id)
        if(!task){
            return res.status(404).json({success:false,message:"doesnt found the task"})
        }
        
        return res.status(201).json({success:true,message:"task by id successfully",task})

    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:"Internal Server Error in get task by id api",err})
    }
})


app.use('/api/task',taskrouter)


app.listen(PORT,()=>{
    console.log("server is running at port 5000")
    connectdb()
})