import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Addtask = () => {
    const navigate = useNavigate();
    const [task,setTask] = useState('')
    const handlesubmit =async (e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:5000/api/task/add',{task})
            console.log(response)
            if(response.data.success===true){
                navigate('/')
            }
            console.log(task)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        
        <h1>Addtask</h1>
        <form onSubmit={handlesubmit}>
            <div>
                <label htmlFor="">cratetask</label>
                <input type="text" placeholder='add task' name='task' onChange={(e)=>setTask(e.target.value)} />
                <button type='submit'>Add Task</button>
            </div>
        </form>
    </div>
  )
}

export default Addtask