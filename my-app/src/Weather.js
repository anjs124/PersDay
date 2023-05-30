import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link  } from 'react-router-dom';
import 우산Photo from './우산.jpg';
import 장갑Photo from './장갑.jpg';
import 플러스Photo from './플러스.jpg';
import 썬크림Photo from './썬크림.jpg';
import 시계Photo from './시계.jpg';
import 마스크Photo from './마스크.jpg';
import './weather.css';





function Weather() {
    const [currentImages, setCurrentImages] = useState([]);
  const { tonename } = useParams();
  const { season } = useParams();
  const [randomImageUrl, setRandomImageUrl] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocationAndWeather = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const API_KEY = '0b1fa4dca85cfc7afeb10e6099111306';
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

  function getWeatherAccessory(weatherDescription) {
    const lowerCaseDescription = weatherDescription.toLowerCase();
    if (lowerCaseDescription.includes('rain') || lowerCaseDescription.includes('drizzle')) {
        return <img src={우산Photo} alt="우산" />;
    } else if (lowerCaseDescription.includes('snow')) {
        return <img src={장갑Photo} alt="장갑" />;
    } else if (lowerCaseDescription.includes('sand')) {
        return <img src={마스크Photo} alt="마스크" />;
    } else if (lowerCaseDescription.includes('clear')) {
        return <img src={썬크림Photo} alt="썬크림" />;
    } else{
        return <img src={시계Photo} alt="시계" />;
    }

  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/images/${tonename}/${season}`)
      .then((response) => {
        setCurrentImages(response.data);
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setRandomImageUrl(response.data[randomIndex]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tonename, season]);


 

  return (
    <div className="result-container">
        <p className="personal-color-title" style={{ fontSize: '2rem' }}>
            당신을 위한 최종코디입니다.

        </p>
        <div className="image-container">
            <div className="image-item">
                {weather && getWeatherAccessory(weather.weather[0].description)}
            </div>
            <div className="image-item">
                <img src={플러스Photo} alt="플러스" />
            </div>
            <div className="image-item">
                {randomImageUrl && (
                <img
                    src={`http://localhost:5000/${randomImageUrl}`}
                    alt="Random Example"
                    key={randomImageUrl}
                    referrerPolicy="no-referrer"
                />
                )}
            </div>
        </div>
    <div>
        
        <Link to="/home">
          <button style={{ marginTop: '1rem' }}>메인 사이트로 이동</button>
        </Link>
        <Link to={`/result/${tonename}/${season}}`}>
          <button style={{ marginTop: '1rem' }}>이전 페이지로 이동</button>
        </Link>
      </div>
    </div>
  );
}

export default Weather
