import React, { useState,useEffect } from 'react';
import axios from 'axios';
import WebcamCapture from './WebcamCapture';
import { getSeasonalTone } from './checkPersonalcolor';
import './Home.css';


function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [faceRgbHsv, setFaceRgbHsv] = useState([]);
  const [hairRgbHsv, setHairRgbHsv] = useState([]);
  const [tonename, setTone] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const handleResultClick = () => {
    window.location.href = `/result/${tonename}`
  };

  const getLocationAndWeather = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const API_KEY = '0b1fa4dca85cfc7afeb10e6099111306'; // OpenWeatherMap API Key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        axios.get(url)
          .then(response => {
            setWeather(response.data);
            setLoading(false);
          })
          .catch(error => console.log(error));
      },
      error => console.log(error)
    );
  };

  useEffect(() => {
    getLocationAndWeather();

    
  }, []);

  

  
  
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filepath', selectedFile.webkitRelativePath); // 파일 경로 추가

    console.log(formData);

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:5000/result')
        .then(response => {
          setFaceRgbHsv(response.data.face_hsv);
          setHairRgbHsv(response.data.hair_hsv);
          
          const tone = getSeasonalTone(
            parseInt(response.data.hair_hsv[0]),
            parseInt(response.data.hair_hsv[1]),
            parseInt(response.data.hair_hsv[2]),
            parseInt(response.data.hair_hsv[3]),
            parseInt(response.data.hair_hsv[4]),
            parseInt(response.data.hair_hsv[5]),
            parseInt(response.data.face_hsv[0]),
            parseInt(response.data.face_hsv[1]),
            parseInt(response.data.face_hsv[2]),
            parseInt(response.data.face_hsv[3]),
            parseInt(response.data.face_hsv[4]),
            parseInt(response.data.face_hsv[5])
          );

          setTone(tone);
          
        })
        .catch(error => {
          console.log(error);
        });
    }, 1000); // 1초마다 요청 보내도록 설정

    


    return () => clearInterval(interval);
  }, [tonename]);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className="Home">
        <form onSubmit={onSubmit}>
            <input type="file" onChange={onFileChange} className="upload-file-button" />
            <button id="analysis-button" type="submit">분석하기</button>            
            <button onClick={handleResultClick}>결과 보기</button>
        </form>
        <div >
            <h2>{weather.name}</h2>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather Icon" />
            <p>{weather.weather[0].description}</p>
            <p>기온: {weather.main.temp}°C</p>
            <p>Feels like: {weather.main.feels_like}°C</p>
            <p>습도: {weather.main.humidity}%</p>
        </div>
        <WebcamCapture />

        <div className="rgbhsv-info">
            Face RGBHSV: {faceRgbHsv.join(", ")}
        </div>
        <div className="rgbhsv-info">
            Hair RGBHSV: {hairRgbHsv.join(", ")}
        </div>
        <div className="tone-info">
            {tonename ? (
            <p>당신의 퍼스널 칼라는 {tonename}!</p>
            ) : (
            <p>당신의 퍼스널 칼라를 알아보려면 사진을 선택하고 업로드하세요!</p>
            )}
            퍼스널 칼라: {tonename ? tonename : ""}
        </div>
    </div>
          
        
  );
}

export default Home;