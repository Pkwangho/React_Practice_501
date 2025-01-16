import React, { useState } from 'react';

const Say = () => {
    const [message, setMessage] = useState('기본값입니다.');
    //실습2 
    const [inputMessage, setInputMessage] = useState('입력창의 기본값입니다.');
    // 추가1
    const [color, setColor] = useState('black');

    const onClickEnter = () => setMessage('안녕하세요!');
    const onClickLeave = () => setMessage('안녕히 가세요!');
    //실습1
    const onClickWelcome = () => setMessage('환영합니다!');
    //실습2 
    const onClickInput = () => setMessage(inputMessage);


    return (
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            {/* 실습1 */}
            <button onClick={onClickWelcome}>환영</button>

            {/* 추가2 */}
            <h1 style={{ color }}>{message}</h1>
            <button style={{ color: 'red' }} onClick={() => setColor('red')}>
                빨간색
            </button>
            <button style={{ color: 'green' }} onClick={() => setColor('green')}>
                초록색
            </button>
            <button style={{ color: 'blue' }} onClick={() => setColor('blue')}>
                파란색
            </button>
            {/* 실습3 */}
            <button style={{ color: 'black' }} onClick={() => setColor('black')}>
                초기화
            </button>

            {/* 실습2 */}
            <input
                type="text"
                placeholder='입력값 메세지를 입력해주세요'
                value={inputMessage}
                // 주의사항, 이벤트 핸들러에서 값을 함수 형태로 입력하기
                onChange={(e) => setInputMessage(e.target.value)} />
            <button onClick={onClickInput}>메세지 출력하기</button>

        </div>
    );
};

export default Say;