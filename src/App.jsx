import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/ProjectPage.jsx';
import Me from './pages/Me.jsx';
import Jukebox from './pages/projectpages/Jukebox.jsx';
import RedbullCanPage from './pages/projectpages/RedbullCan.jsx';
import SplitflapPage from './pages/projectpages/Splitflap.jsx';
import RoboticArmPage from './pages/projectpages/RoboticArm.jsx';
import CheesesteakPage from './pages/projectpages/Cheesesteak.jsx';


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
            <Route path="/Jukebox" element={<Jukebox/>}/>
            <Route path="/RedbullCan" element={<RedbullCanPage/>}/>
            <Route path="/Splitflap" element={<SplitflapPage/>}/>
            <Route path="/RoboticArm" element={<RoboticArmPage/>}/>
            <Route path="/Cheesesteak" element={<CheesesteakPage/>}/>
        </Routes>

      </main>
    </Router>
       
  )
}

export default App
