import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Result.css';
import data from './Tone.json';

function Result() {
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrl2, setImageUrl2] = useState(null); // null로 초기화
  const { tonename } = useParams();
  const tonalInfo = data.find((data) => data.tonename === tonename);

  useEffect(() => {
    axios
      .get('http://localhost:4000/result', {
        responseType: 'blob',
      })
      .then(response => {
        const blob = response.data;
        const imageUrl2 = URL.createObjectURL(blob);
        setImageUrl2(imageUrl2);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/images/${tonename}`)
      .then(response => {
        setImageUrls(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!tonalInfo) {
    return <div>해당하는 톤 정보가 없습니다.</div>;
  }

  return (
    <div className="result-container">
      <div>
        {imageUrl2 && <img src={imageUrl2} alt="Result" style={{ width: '500px', height: '500px' }} />}
      </div>
      <p className="personal-color-title" style={{ fontSize: '2rem' }}>
        당신의 퍼스널 칼라는 {tonename}입니다.
      </p>

      <div className="tonal-info">
        <p>{tonalInfo.description}</p>
      </div>
      <div className="image-container">
        {imageUrls.map(url => (
          <img
            src={`http://localhost:5000/${url}`}
            alt="example"
            key={url}
            referrerPolicy="no-referrer"
          />
        ))}
      </div>
    </div>
  );
}

export default Result;