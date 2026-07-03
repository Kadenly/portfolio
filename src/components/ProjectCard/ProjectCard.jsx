import './ProjectCard.css'
import AnimatedContent from './AnimatedContent'
import { Link } from 'react-router-dom'

export default function ProjectCard(props){
    const card = (
        <AnimatedContent
                distance={75}
                direction="vertical"
                reverse={false}
                duration={.6}
                ease="easeOut"
                initialOpacity={0.2}
                animateOpacity={0.2}
                scale={1}
                threshold={0.2}
                delay={0.1}
                >
        <div className='main'>





        <div className="projectCard">

                    <div className ='cardBody'>

                    {props.video ? (
          <video
            className="cardVideo"
            src={props.video}
            muted
            autoPlay
            loop
            playsInline
            onMouseOver={e => e.target.play()}
            onMouseOut={e => e.target.pause()}
            preload="metadata"
          />
        ) : (
          <img src={props.image} alt={props.title} className="cardImg" />
        )}

                <h2 className='cardTitle'>{props.title}</h2>
                <p className ='cardDescription'>{props.description}</p>
            </div>

            </div>

        </div>
</AnimatedContent>
    )

    return props.link ? <Link to={props.link}>{card}</Link> : card;
}