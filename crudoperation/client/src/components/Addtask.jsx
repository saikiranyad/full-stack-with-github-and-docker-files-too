import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Addtask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/task/add', { task });
      console.log(response);
      if (response.data.success === true) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f5f7fa',
    fontFamily: 'Arial, sans-serif',
  };

  const cardStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '350px',
    textAlign: 'center',
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    background: '#45a049',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Add Task</h1>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Enter your task..."
            name="task"
            style={inputStyle}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.background = '#45a049')}
            onMouseOut={(e) => (e.target.style.background = '#4CAF50')}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addtask;
