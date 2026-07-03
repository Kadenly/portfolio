import BackButton from '../../components/BackButton.jsx';
import RedbullCan from '../../assets/images/RedbullCan.jpg';

export default function RedbullCanPage(){
  return (
    <div className="page">
      <BackButton />
      <h1>Redbull Can Portable Charger</h1>
      <img src={RedbullCan} alt="Redbull Can Portable Charger" className="cardImg" />
      <p>
        A fully functional portable charger disguised as a to-scale Red Bull can.
        CAD-modeled and CNC machined from 6061 aluminum, housing a 2S 3P 18650
        lithium cell pack with an off-the-shelf BMS and charging module.
      </p>
    </div>
  );
}
