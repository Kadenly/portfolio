import ProjectCard from '../components/ProjectCard/ProjectCard.jsx';
import LiveView  from '../components/LiveView.jsx';
import Spring from '../components/Spring.jsx';
import './ProjectPage.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RedbullCan from '../assets/images/RedbullCan.jpg'
import Jukebox from '../assets/images/Jukebox.jpg'
import Splitflap from '../assets/images/Splitflap.mp4'
import RobotArm from '../assets/images/RobotArm.jpg'
import Cheesesteak from '../assets/images/Cheesesteak.jpg'
// import Jukebox from './pages/projectpages/Jukebox.jsx'


export default function Projects(){
    return(
       <div className="page">
      <h1>
      <Spring>Projects</Spring>
      </h1>
      <div className='container'>
    <ProjectCard title='Minecraft Jukebox' description='a speaker' image = {Jukebox} link = '/Jukebox'/>
    <ProjectCard title='Redbull Can Portable Charger' image={RedbullCan} />
    <ProjectCard title='5-Bit Splitflap Display' video ={Splitflap}/>
    <ProjectCard title='Robotic Arm' image ={RobotArm}/>
    <ProjectCard title='Cheesesteak - 1 lb Combat Robot' image ={Cheesesteak}/>
    <LiveView title ="This Website" liveUrl="http://localhost:5173/projects"/>
      </div>
    </div>
  );
}