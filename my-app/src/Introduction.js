
import React from 'react';
import logoImage from './KakaoTalk_20230515_211501731.jpg'; 

const handleResultClick = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Simulate a delay of 0.5 seconds before navigating
    setTimeout(() => {
      window.location.href = `/home`;
    }, 500);
  };

const Introduction = () => {
    return (
        <div
          style={{
            background: 'white',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={logoImage}
            alt="로고"
            style={{ maxWidth: '100%', maxHeight: '50%', width: 'auto', height: 'auto' }}
          />
          
          <h1>Welcome to My Personal Page</h1>
          <p>당신의 퍼스널 칼라와 데일리 코디를 알려드립니다</p>
          <button onClick={handleResultClick}>퍼스널 칼라 진단하러 가기</button>
        </div>
      );
    };
    
    export default Introduction;


