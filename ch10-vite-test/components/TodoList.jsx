import TodoListItem from './TodoListItem';
import './TodoList.scss';
import { useState } from 'react';

const TodoList = ({ todos, onRemove, onToggle }) => {
    // 필터 상태 관리
    const [filter, setFilter] = useState('all'); // 'all', 'checked', 'unchecked'

    // 필터링된 할 일 목록 계산
    const filteredTodos = todos.filter(todo => {
        if (filter === 'checked') return todo.checked;
        if (filter === 'unchecked') return !todo.checked;
        return true; // 'all'일 경우 모든 항목을 반환
    });

    // 체크된 항목의 개수 계산
    const checkedCount = todos.filter(todo => todo.checked).length;

    // 모든 항목의 체크 상태 토글
    const onToggleAll = () => {
        todos.forEach(todo => {
            onToggle(todo.id); // 각 항목의 토글 상태 변경
        });
    };

    return (
        <div className="TodoList">
            {/* 필터 버튼 */}
            <div className="filters">
                <button onClick={() => setFilter('all')}>모두</button>
                <button onClick={() => setFilter('checked')}>체크된 항목</button>
                <button onClick={() => setFilter('unchecked')}>미체크된 항목</button>
            </div>

            {/* 모든 항목 체크/체크 해제 버튼 */}
            <button className="toggleAllButton" onClick={onToggleAll}>
                {checkedCount === todos.length ? '모두 체크 해제' : '모두 체크'}
            </button>

            {/* 체크된 항목 개수 표시 */}
            <div className="checkedCount">
                체크된 항목: {checkedCount}개
            </div>

            {/* 필터링된 할 일 목록 렌더링 */}
            {filteredTodos.map((todo) => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default TodoList;
