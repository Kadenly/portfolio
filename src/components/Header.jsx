import './Header.css';
import SplitText from './SplitText.jsx';
export default function Header(props) {
    const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  return (
    <header className="header">
      <span className="logo">
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
    </header>
  );
}