import React from 'react';
import { useParams } from 'react-router-dom';

function Category() {
    const { name } = useParams(); // URL에서 name 파라미터 추출

    return (
        <div>
            <h2>카테고리 페이지</h2>
            <p>Selected Category: <strong>{name}</strong></p>
        </div>
    );
}

export default Category;
