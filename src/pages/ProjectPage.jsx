import ProjectCard from '../components/ProjectCard/ProjectCard.jsx';
import Spring from '../components/Spring.jsx';
import './ProjectPage.css'
import RedbullCan from '../assets/images/RedbullCan.jpg'
import Jukebox from '../assets/images/Jukebox.jpg'
import Splitflap from '../assets/images/Splitflap.mp4'
import RobotArm from '../assets/images/RobotArm.jpg'
import Cheesesteak from '../assets/images/Cheesesteak.jpg'
import MagDistiller from '../assets/images/DistillerRunning.jpeg'
import { objectPosition } from 'three/tsl';


export default function Projects(){
    return(
       <div className="page">
      <h1>
      <Spring>Projects</Spring>
      </h1>
      <div className='container'>
    <ProjectCard title='Minecraft Jukebox' description='a speaker' image = {Jukebox} link = '/Jukebox'/>
    <ProjectCard title='Redbull Can Portable Charger' image={RedbullCan} link='/RedbullCan'/>
    <ProjectCard title='5-Bit Splitflap Display' video ={Splitflap} link='/Splitflap'/>
    <ProjectCard title='Robotic Arm' image ={RobotArm} link='/RoboticArm'/>
    <ProjectCard title='Cheesesteak - 1 lb Combat Robot' image ={Cheesesteak} link='/Cheesesteak'/>
    <ProjectCard title='Magnesium Distillation' image ={MagDistiller}  link='/MagDistiller'/>
      </div>
    </div>
  );
}