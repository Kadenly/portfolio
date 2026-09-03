import BackButton from '../../components/BackButton.jsx';
import Jukebox from '../../assets/images/Jukebox.jpg';

export default function JukeboxPage(){
  return (
    <div className="page">
      <BackButton />
      <h1>Minecraft Jukebox</h1>
      <img src={Jukebox} alt="Minecraft Jukebox" className="cardImg" />
      <p>Freshman year of college, I figured the best way to learn about my campus was through hands-on experience, so I built a working Minecraft Jukebox.</p>
    </div>
  );
}
