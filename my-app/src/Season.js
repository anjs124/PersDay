import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link  } from 'react-router-dom';
import { getSeason } from './getSeason';
import 봄Photo from './봄.jpg';
import 여름Photo from './여름.jpg';
import 가을Photo from './가을.jpg';
import 겨울Photo from './겨울.jpg';



function Season() {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 추적합니다.
  const { tonename } = useParams();
  const imagesPerPage = 16; // 한 페이지에 표시할 이미지 수입니다.

  useEffect(() => {
    const season = getSeason(); // getSeason() 함수를 사용하여 현재 시즌 값을 가져옴

    axios
      .get(`http://localhost:5000/images/${tonename}/${season}`)
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

  const getProfilePhoto = () => {
    const season = getSeason();
    let profilePhoto = '';

    if (season === '봄') {
      profilePhoto = 봄Photo;
    } else if (season === '여름') {
      profilePhoto = 여름Photo;
    } else if (season === '가을') {
      profilePhoto = 가을Photo;
    } else if (season === '겨울') {
      profilePhoto = 겨울Photo;
    }

    return profilePhoto;
  };

  

  // 전체 페이지 수를 계산합니다.
  const totalPages = Math.ceil(imageUrls.length / imagesPerPage);

  return (
    <div className="result-container">
        <img
            src={getProfilePhoto()}
            alt="로고"
            style={{
                maxWidth: '400px',
                height: 'auto',
                maxHeight: '800px', 
                objectFit: 'contain', 
            }}
        />
        <p className="personal-color-title" style={{ fontSize: '2rem' }}>
            현재 계절은 {getSeason()}입니다.

        </p>

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
        <Link to={`/result/${tonename}`}>
          <button style={{ marginTop: '1rem' }}>이전 페이지로 이동</button>
        </Link>
      </div>
    </div>
  );
}

export default Season
