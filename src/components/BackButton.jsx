import { Link } from 'react-router-dom'
import './BackButton.css'

export default function BackButton(){
    return (
        <Link to="/projects" className="back-button">&larr; Back to Projects</Link>
    )
}
