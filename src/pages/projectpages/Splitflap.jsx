import BackButton from '../../components/BackButton.jsx';
import Splitflap from '../../assets/images/Splitflap.mp4';

export default function SplitflapPage(){
  return (
    <div className="page">
      <BackButton />
      <h1>5-Bit Splitflap Display</h1>
      <video className="cardImg" src={Splitflap} muted autoPlay loop playsInline />
      <p>
        A mechanical split-flap display, the kind you see in old train stations.
        V1 is complete, built with a custom PCB per flap module, a TMC2202 stepper
        driver, an Arduino Nano local controller, and I2C daisy-chaining between
        modules. V2 is planned around a Raspberry Pi central controller.
      </p>
    </div>
  );
}
