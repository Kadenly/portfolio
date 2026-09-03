import Spring from '../components/Spring.jsx';
import './Home.css'
import me from '../assets/images/me.JPEG'
export default function Home(){
    return(
      <>
       <div className="page">
        <h1>
          <Spring>Hi!</Spring>
        </h1>

          
          <p>Where the heart is</p>
    </div>

    <div className='Body'>
      <img className='me' src={me} alt="Kaden Ly"/>
      
      <p className='Intro'>
        Hello! My name is Kaden. I'm a mechanical engineering student at Worcester Polytechnic Institute.
      </p>

      <p className='Disclaimer'>
        Fair warning: I coded this whole site myself, no AI, so it's rough around the edges in places.
        I'm a mechanical engineer, not a programmer, and I'd rather it look a little homemade than fake polish.
      </p>

    </div>

    </>
  );
}