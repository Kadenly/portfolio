import React from 'react'
import './Navbar.css'
import SplitText from '../SplitText.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'


export default function Navbar(props){
    const handleAnimationComplete = () => {
    console.log('All letters have animated!');
    }
    return(
        <div className='navbar'>
            <span className='logo'>
                <SplitText
                    text={props.title}
                    className="text-4x2 font-semibold text-center"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-500px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
        />
            </span>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/me">Me</Link></li>
            </ul>


            <img src="" alt="" className='toggle-icon'/>
        </div>
    )
}