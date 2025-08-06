import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
// import './ProjectCard.css';

export default function LiveView({ title, description, liveUrl }) {
  const siteRef = useRef();
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const takeSnapshot = async () => {
      if (siteRef.current) {
        const canvas = await html2canvas(siteRef.current, { useCORS: true });
        const dataURL = canvas.toDataURL('image/png');
        setSnapshot(dataURL);
      }
    };

    // Small delay to let iframe finish loading
    const timer = setTimeout(() => {
      takeSnapshot();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="projectCard">
      {/* Hidden iframe for snapshotting */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <iframe
          ref={siteRef}
          src={liveUrl}
          width="800"
          height="600"
          title="Hidden preview"
        />
      </div>

      {/* Visible snapshot */}
      {snapshot ? (
        <img src={snapshot} className="cardImg" alt="Live snapshot" />
      ) : (
        <div className="cardImg loading">Loading preview...</div>
      )}

      <div className="cardBody">
        <h2 className="cardTitle">{title}</h2>
        <p className="cardDescription">{description}</p>
      </div>
    </div>
  );
}
