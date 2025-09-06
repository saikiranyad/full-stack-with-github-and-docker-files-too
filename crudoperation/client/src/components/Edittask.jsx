import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edittask = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [task, setTask] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchgettaskbyid = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/task/get/${id}`)
                if (response.data.success === true) {
                    setTask(response?.data?.task?.task)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchgettaskbyid()
    }, [id])

    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log(task)
        try {
            const response = await axios.put(`http://localhost:5000/api/task/edit/${id}`, { task })
            if (response.data.success === true) {
                alert("Task updated successfully ✅")
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    if (loading) return <h2>Loading task...</h2>

    return (
        <div>
            <h1>Edit Task</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    <label htmlFor="task">Task</label>
                    <input
                        type="text"
                        id="task"
                        placeholder="Edit the current task"
                        name="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button type="submit" disabled={!task.trim()}>
                        Update Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Edittask
