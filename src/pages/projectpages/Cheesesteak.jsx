import BackButton from '../../components/BackButton.jsx';
import Cheesesteak from '../../assets/images/Cheesesteak.jpg';

export default function CheesesteakPage(){
  return (
    <div className="page">
      <BackButton />
      <h1>Cheesesteak - 1 lb Combat Robot</h1>
      <img src={Cheesesteak} alt="Cheesesteak - 1 lb Combat Robot" className="cardImg" />
      <p>
        A 1 lb combat robot named Cheesesteak.
      </p>
    </div>
  );
}
