import BackButton from '../../components/BackButton.jsx';
import RobotArm from '../../assets/images/RobotArm.jpg';

export default function RoboticArmPage(){
  return (
    <div className="page">
      <BackButton />
      <h1>Robotic Arm</h1>
      <img src={RobotArm} alt="Robotic Arm" className="cardImg" />
      <p>
        A custom 6-degree-of-freedom robotic arm, built across two iterations.
        V2 is the current complete version: ESP32 controller, stepper motors
        with planetary gearboxes, inverse kinematics implemented in Python and
        C++, and a 20 kg payload. V3 is planned.
      </p>
    </div>
  );
}
