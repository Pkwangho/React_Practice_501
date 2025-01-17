import React, { useState } from 'react';

const IterationSampleEx = () => {

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
    // map -> (name), name 이라는 인자값에는 
    // { id: 1, text: '눈사람' }
    // 



    // 데이터 삭제 작업. 1
    // const onRemove = (id, text) => {
    //     //filter ,모든 요소를 검사를해서, 조건에
    //     // 맞는 요소만 뽑아서 새로운 배열을 생성. 
    //     // (name), name 이라는 인자값에는 
    //     // { id: 1, text: '눈사람' }
    //     // 만약 id = 1, 조건에 맞는 배열의 요소는 
    //     // id = 2, 3, 4 조건에 맞고, 
    //     // id = 1 조건에 x
    //     // 결론, 필터가 된 새로운 배열 : id = 2,3,4
    //     const nextNames = names.filter((name) => name.id !== id);
    //     // nextNames
    //     // [
    //     //  { id: 2, text: '얼음' },
    //     // { id: 3, text: '눈' },
    //     // { id: 4, text: '바람' },
    //     // ]
    //     setNames(nextNames);
    //     console.log(`삭제한 요소는 , ${id}, ${text}`)

    // };
    //추가 작업 onClick 분리 하기. 
    const onClick = () => {
        // 실습 2, 기본 유효성 체크 
        if (!inputText.trim()) {
            alert("공백은 입력 할수 없습니다.")
            return
        }
        //실습1, 추가시, 기존요소와 동일하면, 추가 안함. 
        // 내장 함수, some 함수이용. 
        // some 함수, 해당 요소 중에서, 하나라도 일치하는게 있으면, true ,
        // 모두 불일치 하면, false, 
        // 결론, 전체 요소 중에서, 같은 요소가 있는지 검사용으로 활용. 
        if (names.some((name) => name.text === inputText)) {
            alert("이미 존재하는 항목입니다.")
            setInputText("")
            return;
        }

        // concat, 내장함수, 기존 배열을 유지하고, 
        // 새로운 요소를 추가한 새 배열을 생성. 
        //예) ddd 추가 
        const newNames = names.concat({ id: nextId, text: inputText });
        // newNames
        //   { id: 1, text: '눈사람' },
        // { id: 2, text: '얼음' },
        // { id: 3, text: '눈' },
        // { id: 4, text: '바람' },
        // { id: 5, text: 'ddd' },
        // 클릭 시, 새 배열로 교체
        setNames(newNames);
        // 클릭 시, 새 번호 증가.
        setNextId(nextId + 1);
        // 클릭 시, 기존 입력값은 지우기.
        setInputText('');
    }

    //실습 4번, 수정 기능, 우클릭시 요소 수정하기. 1
    const onUpdate = (id, newText) => {
        const updateNames = names.map((name) =>
            name.id === id ? { ...name, text: newText } : name)
        setNames(updateNames);
    }
    //실습 4번,수정 기능, 우클릭시 요소 수정하기. 2
    const rightClick = (id, text) => {
        const newText = prompt("수정할 내용을 입력하세요.", text);
        if (newText && newText.trim()) {
            onUpdate(id, newText)
        }
    }

    //실습 5번, 오름 차순, 내림 차순 (사전식 정렬)
    const sortAscending = () => {
        //(a, b) => a.text.localeCompare(b.text)
        // a => 첫번째 요소의 객체  { id: 1, text: '눈사람' },
        // b => 두번째 요소의 객체  { id: 2, text: '얼음' },
        // localeCompare, a 요소 와 b 요소를 비교해서, 
        // 양수(0보다크면), a 가 b보다 뒤에 있음. 
        // 0 , a , b 같은 자리. 
        // 음수 a 가 b보다 앞에 있음.
        const sortedNames = [...names].sort((a, b) => a.text.localeCompare(b.text));
        setNames(sortedNames);
    }

    const sortDescending = () => {
        const sortedNames = [...names].sort((a, b) => b.text.localeCompare(a.text));
        setNames(sortedNames);
    }

    // 실습 6번, 삭제한 요소를 따로 보관하는 state 
    const [deletedItems, setDeletedItems] = useState([]);

    // 실습 6번, 기존에 삭제하는 기능에서, 추가 작업. 
    // 삭제한 내용을, deletedItems 배열에 담기.
    const onRemove = (id) => {
        //find 내장함수를 이용해서, 기존 배열에서, 삭제할 요소만 뽑아서, 새로운 배열생성. 
        // 예시) 1요소를 삭제 했음. 
        // remvedItem, 삭제할 요소가 담김. 1 요소 
        const removedItem = names.find((name) => name.id === id);
        if (confirm(`${removedItem.text}를 삭제하시겠습니까?`)) {
            // 삭제한 내용을, deletedItems 배열에 담기.
            setDeletedItems([...deletedItems, removedItem])
            // 삭제할 요소를 제외한 나머지 요소 담김. 2,3,4 요소  
            const nextNames = names.filter((name) => name.id !== id);
            setNames(nextNames);
            console.log(`삭제한 요소는 , ${id}`)
        }
    };

    // 실습 6번, 복구하는 기능. 
    // 삭제 한 요소를 가진 배열(deletedItems) -> 출력하는 배열로 옮기기. (names)
    const restoreItem = (id) => {
        const restoredItem = deletedItems.find((item) => item.id === id);
        setNames([...names, restoredItem])
        // 삭제한 요소를 가지는 배열에서, 다시 삭제요소를 제거. 
        setDeletedItems(deletedItems.filter((item) => item.id !== id));
    }

    {/* // 실습3번, 목록 요소를 클릭시, 해당 요소 id 출력해보기.  */ }
    // 우클릭 이벤트 핸들링 onContextMenu
    const namesList = names.map((name) =>
        <li key={name.id}
            onContextMenu={() => rightClick(name.id, name.text)}
            onDoubleClick={() => onRemove(name.id, name.text)}>{name.text}</li>);

    return (
        <div>
            <input
                // 값을 입력시, onChange에 의해서 실시간으로 
                // 변수에 값이 할당됨
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="새 항목 입력"
            />
            <button
                // 추가 작업
                onClick={onClick}
            >
                추가
            </button>
            <button onClick={sortAscending}>오름차순 정렬</button>
            <button onClick={sortDescending}>내림차순 정렬</button>
            <ul>{namesList}</ul>
            <h1>삭제한 목록</h1>
            {deletedItems.length > 0 && (
                <ul>
                    {deletedItems.map((item) =>
                        <li key={item.id}>
                            {item.text}
                            <button onClick={() => restoreItem(item.id)}>복구</button>
                        </li>)}
                </ul>
            )}
        </div>
    );
};
export default IterationSampleEx;