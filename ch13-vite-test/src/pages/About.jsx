//추가, useSearchParams : 쿼리스트링 확인하는 도구
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';



const About = () => {
    //추가
    // const location = useLocation();
    // useLocation으로 현재 경로 정보 가져오기
    const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams 호출 형태 수정

    const detail = searchParams.get('detail'); // 'detail' 값 가져오기
    const mode = searchParams.get('mode'); // 'mode' 값 가져오기
    const lang = searchParams.get('lang') || 'en'

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/')
    }

    //추가
    // detail 값을 토글하는 함수
    const onToggleDetail = () => {
        setSearchParams({ mode, detail: detail === 'true' ? 'false' : 'true' });
    };
    const changeLanguage = (language) => {
        setSearchParams({ lang: language }); // URL의 lang 값을 변경
    };

    //추가
    // mode 값을 증가시키는 함수
    const onIncreaseMode = () => {
        const nextMode = mode === null ? 1 : parseInt(mode) + 1;
        setSearchParams({ mode: nextMode, detail });
    };

    return (
        <div>
            <h1>소개</h1>
            <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
            {/* //추가 */}
            {/* <p>쿼리스트링 location.search: {location.search}</p>
            <p>현재 주소의 경로 location.pathname: {location.pathname}</p>
            <p>location.hash: {location.hash}</p>
            <p>location.state: {location.state}</p>
            <p>location.key: {location.key}</p> */}
            {/* //추가 */}
            <p>detail: {detail}</p>
            <p>mode: {mode}</p>
            <strong>Selected Language:</strong> {lang}
            <button onClick={onToggleDetail}>Toggle detail</button>
            <button onClick={onIncreaseMode}>mode + 1</button>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('ko')}>Korean</button>
            <button onClick={() => changeLanguage('fr')}>French</button>
            <button onClick={goHome}> Home 페이지로</button>
        </div>
    );
};

export default About;