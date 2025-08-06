import Spring from '../components/Spring.jsx';
import './Home.css'
import me from '../assets/images/Me.JPEG'
export default function Home(){
    return(
      <>
       <div className="page">
          <Spring>Home</Spring>
          <p>Where the heart is</p>
    </div>

    <div className='Body'>
      <img className='me' src=''/>
      
      <p className='Intro'>
        Hello! My name is Kaden. I'm a mechanical engineering student at Worcester Polytechnic Institute.
      </p>

    
    </div>

    </>
  );
}