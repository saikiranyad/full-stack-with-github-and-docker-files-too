
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Alltasks from './components/Alltasks'
import Addtask from './components/Addtask'
import Edittask from './components/Edittask'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Alltasks/>}/>
      <Route path='/Add' element={<Addtask/>}/>
      <Route path='/edit/:id' element={<Edittask/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
