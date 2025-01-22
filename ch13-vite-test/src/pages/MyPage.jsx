import { Navigate } from 'react-router-dom';

const MyPage = () => {
    const isLoggedIn = false;
    //작업 순서, 
    // 이상용 페이지 -> 마이페이지 접근(현재) -> 로그인 페이지 
    if (!isLoggedIn) {
        return <Navigate to="/login" replace={true} />;
    }

    return <div>마이 페이지</div>;
};

export default MyPage;