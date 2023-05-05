import React from 'react';
import { useParams } from 'react-router-dom';

function Result(props) {
    const { tonename } = useParams();

  return (
    <div>
      <p>당신의 퍼스널 칼라는 {tonename}입니다.</p>
      ...
    </div>
  );
}

export default Result;