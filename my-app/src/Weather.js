
// import React from 'react';




//   const handleResultClick = (event) => {
    
//     event.preventDefault();
    
    
//     setTimeout(() => {
//       window.location.href = `/result/${tonename}`;
//     }, 500);
//   };

// const Introduction = () => {
//     return (
//         <div
//           style={{
//             background: 'white',
//             height: '100vh',
//             display: 'flex',
//             flexDirection: 'column', 
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//             <div >
//                 <h2>{weather.name}</h2>
//                 <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather Icon" />
//                 <p>{weather.weather[0].description}</p>
//                 <p>기온: {weather.main.temp}°C</p>
//                 <p>Feels like: {weather.main.feels_like}°C</p>
//                 <p>습도: {weather.main.humidity}%</p>
//             </div>
//         </div>
//       );
//     };
    
    



// const getLocationAndWeather = () => {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         const API_KEY = '0b1fa4dca85cfc7afeb10e6099111306'; 
//         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

//         axios.get(url)
//           .then(response => {
//             setWeather(response.data);
//             setLoading(false);
//           })
//           .catch(error => console.log(error));
//       },
//       error => console.log(error)
//     );
//   };

//   useEffect(() => {
//     getLocationAndWeather();

    
//   }, []);