import React, { useState } from 'react';

const IterationSample = () => {

    // 리액트에서는 불변성 유지. 
    // 기존 배열을 수정하지 않고, 새로운 배열을 만들어 주는 map 내장 함수 이용. 
    // 주의사항. 
    // 1. 리스트로 값들을 출력시, 요소에 반드시 key 속성을 사용해야함. 
    // names -> 초기값 형태, 배열 안에 객체를 요소로 가짐. 
    const [names, setNames] = useState([
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' },
    ]);
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id



    // 데이터 삭제 작업. 2
    const namesList = names.map((name) =>
        <li key={name.id}
            onDoubleClick={() => onRemove(name.id)}
            onClick={() => handleClick(name.id)}
        >{`id: ${name.id}, text: ${name.text}`}</li>);

    // 데이터 삭제 작업. 1
    const onRemove = (id) => {
        const nextNames = names.filter((name) => name.id !== id);
        setNames(nextNames);
    };

    const handleClick = (id) => {
        console.log("Clicked ID: ", id);
        alert(`ID : ${id}`);
    };

    return (
        <div>
            <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="새 항목 입력"
            />
            <button
                // 추가 작업
                onClick={() => {
                    if (inputText.trim() === '') {
                        alert('공백');
                        return;
                    }
                    if (names.some((name) => name.text === inputText)) {
                        alert('중복');
                        return;
                    }
                    // concat, 내장함수, 기존 배열을 유지하고, 
                    // 새로운 요소를 추가한 새 배열을 생성. 
                    const newNames = names.concat({ id: nextId, text: inputText });
                    // 클릭 시, 새 배열로 교체
                    setNames(newNames);
                    // 클릭 시, 새 번호 증가.
                    setNextId(nextId + 1);
                    // 클릭 시, 기존 입력값은 지우기.
                    setInputText('');
                }}
            >
                추가
            </button>
            <ul>{namesList}</ul>
        </div>
    );
};
export default IterationSample;