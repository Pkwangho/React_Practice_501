import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/about">소개</Link>
                </li>
                <li>
                    <Link to="/profiles/velopert">velopert의 프로필</Link>
                </li>
                <li>
                    <Link to="/profiles/gildong">gildong의 프로필</Link>
                </li>
                <li>
                    <Link to="/profiles/lsy">lsy의 프로필</Link>
                </li>
                <li>
                    <Link to="/profiles/void">존재하지 않는 프로필</Link>
                </li>
                <li>
                    <Link to="/Articles">게시글 목록</Link>
                </li>
                <li>
                    <Link to="/mypage">마이페이지</Link>
                </li>
                <li>
                    <Link to="/login">로그인</Link>
                </li>
                {/* // 실습1 */}
                <li>
                    <Link to="/category/lsy">lsy 카테고리 샘플</Link>
                </li>
                {/* 실습2 쿼리스트링*/}
                <li>
                    <Link to="/category/lsy?username=이상용">lsy 쿼리스트링 샘플</Link>
                </li>
                {/* 실습3 중첩라우팅 확인*/}
                <li>
                    <Link to="/category/lsy/details">lsy 중첩라우팅 샘플</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;