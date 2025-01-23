import React from 'react';
import { useParams, useSearchParams, Outlet, useNavigate } from 'react-router-dom';

// 실습1
const Category = () => {
    // <Route path="/category/:name" element={<Category />} />, 참고
    //http://localhost:5173/category/lsy
    const { name } = useParams();

    // 실습2 , 쿼리 스트링 가져오기. 
    //http://localhost:5173/category/lsy?username=이상용
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username')
    //실습 6,
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/')
    }
    return (

        <div>
            <button onClick={goHome}>홈가기</button>
            <h1>Category 페이지입니다.</h1>
            <h2>파라미터 받기 예시 useParams() 이용: {name} </h2>
            <h2>쿼리 스트링 받기 예시 useSearchParams() 이용: {username} </h2>
            <h2>중첩 라우팅 화면 표시 </h2>
            {/* 실습3  */}
            <Outlet />
        </div >
    );
};

export default Category;