import { useState, useEffect, useRef } from 'react';
import './WebcamCapture.css';

function WebcamCapture() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [filename, setFilename] = useState('captured-image.jpg');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      setStream(stream);
    });
  }, []);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const dataURL = canvas.toDataURL('image/jpeg', 1);
    setCapturedImage(dataURL);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = capturedImage;
    link.type = 'image/jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  return (
    <div className="video-container">
      <div className="video-wrapper">
        <video ref={videoRef} autoPlay></video>
        <div>
          <button onClick={handleCapture}>Take Photo</button>
        </div>
      </div>
      {capturedImage && (
        <div className="image-wrapper">
          <img src={capturedImage} alt="Captured" />
          <div>
            <input type="text" value={filename} onChange={handleFilenameChange} />
            <button onClick={handleDownload}>Download</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebcamCapture;