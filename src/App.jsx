import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/ProjectPage.jsx';
import Me from './pages/Me.jsx';


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

function App() {
  const [count, setCount] = useState(0)

  return (
    
   
    <Router>
      <Navbar title="Kaden Ly"/>
      <main className="main-content">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/me" element={<Me/>}/>
        </Routes>

      </main>
    </Router>
       
  )
}

export default App
