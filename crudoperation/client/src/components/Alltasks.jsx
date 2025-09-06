import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Alltasks = () => {
    const navigate = useNavigate()
    const [alltaskss, setAlltasks] = useState([])

    useEffect(() => {
        const fetchgelltasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/task/get')
                console.log(response.data.alltasks)
                if (response?.data?.success === true) {
                    setAlltasks(response?.data?.alltasks)
                }

            } catch (err) {
                console.log(err)
            }

        }
        fetchgelltasks()
    }, [])

    const handledelete =async(id)=>{
        try{
            const response = await axios.delete(`http://localhost:5000/api/task/delete/${id}`)
            console.log(response)
            if(response.data.success === true){
                setAlltasks((prev)=>prev.filter(task=>id!==task._id))
            }
        }catch(err){
            console.log(err)
        }
    } 
    return (
        <div>
            <button onClick={() => navigate('/add')}>Addtask</button>
            <h1>all Tasks</h1>
            <div>
                {
                    alltaskss.map((task, index) => (
                        <div>
                            <p>{task.task}</p>
                            <button onClick={()=>navigate(`/edit/${task._id}`)}>edit</button>
                            <button onClick={()=>handledelete(task._id)}>delete</button>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Alltasks