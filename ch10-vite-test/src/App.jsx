//추가2-1, useRef, useCallback
import { useRef, useCallback, useState } from 'react'

import './App.css'
import TodoTemplate from '../components/TodoTemplate'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'

function App() {
  // 더미 데이터 추가1
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  //추가2-2, useRef
  // 고유 id로 사용될 값
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  //추가2-3, useCallback 이용해서, 한번만 생성후, 재사용.
  const onInsert = useCallback(
    (text) => {
      // 사용자가 입력한 일정, 객체
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // 불변성 유지 하면서, 내장함수 concat , 기본 배열에 추가하기.
      setTodos((todos) => todos.concat(todo)); // 새로운 항목 추가
      nextId.current += 1; // nextId를 1씩 증가
    },
    []
  );

  // 추가 3-1,
  const onRemove = useCallback(
    (id) => {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    },
    []
  );

  // 추가 4-1
  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);


  return (
    <>
      <h1 className='react'>ch10 일정관리 애플리케이션 예제</h1>
      <TodoTemplate>
        {/* Todo App을 만들자! */}
        {/* 추가2-4, 부모 -> 자식, props 전달, onInsert*/}
        <TodoInsert onInsert={onInsert} />
        {/* 더미 데이터 추가2  props 로 전달. */}
        {/* 추가 3-3, onRemove 부모 -> 자식, props 전달, onRemove */}
        {/* 추가 4-2, onToggle 부모 -> 자식, props 전달, onToggle */}
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>;

    </>
  )
}

export default App
