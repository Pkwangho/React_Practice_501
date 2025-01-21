//추가2-1, useRef, useCallback
import { useRef, useCallback, useState, useReducer } from 'react'
import './App.css'
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'

// 더미 데이터 추가1
// 많은 더미 데이터 추가하기. 
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 5000; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

// 리듀서 함수 이용하기.
// todoReducer 함수
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새 항목 추가
      // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
      return todos.concat(action.todo);

    case 'REMOVE': // 항목 제거
      // { type: 'REMOVE', id: 1 }
      return todos.filter((todo) => todo.id !== action.id);

    case 'TOGGLE': // 체크 상태 토글
      // { type: 'TOGGLE', id: 1 }
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    case 'REMOVE_CHECKED':
      // 체크된 항목들 모두 삭제
      return todos.filter((todo) => !todo.checked);

    default:
      return todos;
  }
}


function App() {

  // createBulkTodos, 한번만 호출하기 위해서, 
  // () 빼고 넣기.
  // const [todos, setTodos] = useState(createBulkTodos);

  // useReducer로 상태 관리
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  const [searchTerm, setSearchTerm] = useState('');

  //추가2-2, useRef
  // 고유 id로 사용될 값
  // ref를 사용하여 변수 담기
  const nextId = useRef(5001);

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
      // setTodos((todos) => todos.concat(todo)); // 새로운 항목 추가
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1; // nextId를 1씩 증가
    },
    []
  );

  // 추가 3-1,
  const onRemove = useCallback(
    (id) => {
      // setTodos(
      //   (todos) => todos.filter((todo) => todo.id !== id)
      // );
      dispatch({ type: 'REMOVE', id });

    },
    []
  );

  // 추가 4-1
  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
    // setTodos(
    //   (todos) =>
    //     todos.map((todo) =>
    //       todo.id === id ? { ...todo, checked: !todo.checked } : todo
    //     )
    // );
  }, []);

  //실습1, 
  const checkedCount =
    todos.filter((todo) => todo.checked).length

  //실습2, todos 배열 안의 객체 요소의 checked 부분 설정. 
  // 함수 안에, 다시 함수 형태로 넣게 되면, 
  // useCallback 사용시, 의존성 배열안에 빈 문자열을 넣어서, 
  // 함수를 한번 만 생성 후, 재사용하는 결과 와 같음. 
  const toggleAll = useCallback(() => {
    setTodos(
      (todos) =>
        todos.map((todo) => ({ ...todo, checked: !todo.checked }))
    )
  }, []);

  //실습3, 
  const checkedTodos = todos.filter((todo) => todo.checked);
  const uncheckedTodos = todos.filter((todo) => !todo.checked);

  const onRemoveChecked = useCallback(() => {
    dispatch({ type: 'REMOVE_CHECKED' });
  }, []);

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어가 포함된 항목 필터링
  );




  return (
    <>
      <h1 className='react'>ch11 컴포넌트 성능 최적화</h1>
      <TodoTemplate>
        {/* Todo App을 만들자! */}
        {/* 추가2-4, 부모 -> 자식, props 전달, onInsert*/}
        <TodoInsert onInsert={onInsert} />
        {/* <div>
          완료된 항목의 갯수 : {checkedCount}
          <button onClick={toggleAll}>상태 체크 반전 모두하기.</button>
          <div>
            <h3>체크된 항목</h3>
            <TodoList todos={checkedTodos} onRemove={onRemove} onToggle={onToggle} />
            <h3>체크 안된 항목</h3>
            <TodoList todos={uncheckedTodos} onRemove={onRemove} onToggle={onToggle} />
          </div>
        </div> */}

        {/* 더미 데이터 추가2  props 로 전달. */}
        {/* 추가 3-3, onRemove 부모 -> 자식, props 전달, onRemove */}
        {/* 추가 4-2, onToggle 부모 -> 자식, props 전달, onToggle */}
        {/* 검색 입력창 */}
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 입력값을 검색어로 설정
        />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        <button onClick={onRemoveChecked}>체크된 항목 모두 삭제</button> {/* 체크된 항목 삭제 버튼 */}

        <TodoList todos={filteredTodos} onRemove={onRemove} onToggle={onToggle} />

      </TodoTemplate>;

    </>
  )
}

export default App
