import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [isStreamStarted, setIsStreamStarted] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const toggleCamera = async () => {
    if (isStreamStarted) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsStreamStarted(true);
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setIsStreamStarted(false);
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
    justifyContent: 'center', // 변경
    alignItems: 'center',
    padding: '20px 0',
    border: '3px solid silver',
  };

  const videoContainerStyle = {
    width: '100%',
    height: '90%',
    backgroundColor: 'black',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

  return (
      <div style={containerStyle}>
        <div style={videoContainerStyle}>
          {isStreamStarted ? (
              <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={videoStyle}
              />
          ) : (
              <div style={{width: '100%', height: '100%', backgroundColor: 'black'}} />
          )}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
          <button
              onClick={toggleCamera}
              style={buttonStyle}
              aria-label={isStreamStarted ? "Stop Camera" : "Start Camera"}
          />
        </div>
      </div>
  );
}

export default App;