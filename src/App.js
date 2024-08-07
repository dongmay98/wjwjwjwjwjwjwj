import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [isStreamStarted, setIsStreamStarted] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsStreamStarted(true);
    } catch (err) {
      console.error("Error accessing the camera:", err);
      alert("Unable to access the camera. Please check your browser settings and permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      streamRef.current = null;
      setIsStreamStarted(false);
    }
  };

  const toggleCamera = () => {
    if (isStreamStarted) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const containerStyle = {
    position: 'relative',
    width: '250px',
    height: '500px',
    backgroundColor: 'black',
    margin: '0 auto',
    borderRadius: '30px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0',
    border: '3px solid silver',
  };

  const videoContainerStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const buttonStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'red',
    border: '2px solid silver',
    cursor: 'pointer',
  };

  const textStyle = {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
  };

  return (
      <div style={containerStyle}>
        <div style={videoContainerStyle}>
          <video ref={videoRef} autoPlay playsInline muted style={videoStyle} />
          {isStreamStarted && <div style={textStyle}>전우진ㅄ</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <button onClick={toggleCamera} style={buttonStyle} />
        </div>
      </div>
  );
}

export default App;