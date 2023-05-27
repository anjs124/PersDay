import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link  } from 'react-router-dom';
import './Result.css';
import data from './Tone.json';
import { getSeason } from './getSeason';

function Result() {
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrl2, setImageUrl2] = useState(null); // 초기값은 null로 설정
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 추적합니다.
  const { tonename } = useParams();
  const tonalInfo = data.find((data) => data.tonename === tonename);
  const imagesPerPage = 16; // 한 페이지에 표시할 이미지 수입니다.

  useEffect(() => {
    axios
      .get('http://localhost:4000/result', {
        responseType: 'blob',
      })
      .then((response) => {
        const blob = response.data;
        const imageUrl2 = URL.createObjectURL(blob);
        setImageUrl2(imageUrl2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/images/${tonename}`)
      .then((response) => {
        setImageUrls(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tonename]);

  // 현재 페이지를 기반으로 표시할 이미지의 인덱스 범위를 계산합니다.
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = imageUrls.slice(indexOfFirstImage, indexOfLastImage);

  // 버튼 클릭 이벤트를 처리하여 현재 페이지를 업데이트합니다.
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!tonalInfo) {
    return <div>해당하는 톤 정보가 없습니다.</div>;
  }

  // 전체 페이지 수를 계산합니다.
  const totalPages = Math.ceil(imageUrls.length / imagesPerPage);

  return (
    <div className="result-container">
      <div>
        {imageUrl2 && (
          <img src={imageUrl2} alt="Result" style={{ width: '500px', height: '500px' }} />
        )}
      </div>
      <p className="personal-color-title" style={{ fontSize: '2rem' }}>
        당신의 퍼스널 칼라는 {tonename}입니다.
      </p>

      <div className="tonal-info">
        <p>{tonalInfo.description}</p>
      </div>
      <div className="image-container">
        {currentImages.map((url) => (
          <img
            src={`http://localhost:5000/${url}`}
            alt="example"
            key={url}
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      <div>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: '0.5rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: currentPage === index + 1 ? 'blue' : 'transparent',
              color: currentPage === index + 1 ? 'white' : 'black',
              border: '1px solid black',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div>
        
        <Link to="/home">
          <button style={{ marginTop: '1rem' }}>메인 사이트로 이동</button>
        </Link>
        
        <Link to={`/result/${tonename}/${getSeason()}`}>
          <button style={{ marginTop: '1rem' }}>Season 페이지로 이동</button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
