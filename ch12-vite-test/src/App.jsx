import { useRef, useCallback, useState } from 'react';
import './App.css'
import { produce } from 'immer';

const App = () => {
  const nextId = useRef(1); // 다음 id를 저장하는 useRef
  const [form, setForm] = useState({ name: '', username: '' });
  // 입력 폼 상태
  const [data, setData] = useState({
    array: [], // 항목 배열
    uselessValue: null, // 필요 없는 값 (유지)
  });

  // 입력값 변경을 처리하는 함수
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm(
        // {
        //교체1
        // ...form,
        // [name]: value, // name 속성에 따라 값 변경
        // }
        // produce(form, (draft) => {
        //   draft[name] = value;
        // })
        //교체1-2
        produce((draft) => {
          draft[name] = value;
        })
      );
    },
    //교체1-3
    // [form]
    []
  );

  // 폼 제출을 처리하는 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); // 새로고침 방지
      if (!form.name.trim() || !form.username.trim()) {
        alert("name과 username 입력해주세요")
        return;
      }

      //실습1 ,
      if (data.array.some((item) => item.username === form.username)) {
        alert("이미 존재하는 아이디입니다.")
        return;
      }

      const info = {
        id: nextId.current, // 고유 id
        name: form.name,
        username: form.username,
        //실습2, 
        completed: false,
      };

      // 배열에 새 항목 추가
      setData(
        //교체2
        //   {
        //   ...data,
        //   array: data.array.concat(info),
        // }
        // 교체 2-2
        // produce(data, (draft) => {
        //   draft.array.push(info);
        // })
        produce((draft) => {
          draft.array.push(info);
        })
      );

      // 폼 초기화
      setForm({
        name: '',
        username: '',
      });

      nextId.current += 1; // id 증가
    },
    // 교체 2-3
    // [data, form.name, form.username]
    [form.name, form.username]
  );

  // 항목을 삭제하는 함수
  const onRemove = useCallback(
    (id) => {
      setData(
        //교체3
        //   {
        //   ...data,
        //   array: data.array.filter((info) => info.id !== id), // id가 일치하지 않는 항목만 유지
        // }

        //교체 3-2
        // produce(data, (draft) => {
        //   const index = draft.array.findIndex((info) => info.id === id);
        //   if (index !== -1) {
        //     draft.array.splice(index, 1); // 해당 항목 삭제
        //   }
        // })
        produce((draft) => {
          const index = draft.array.findIndex((info) => info.id === id);
          if (index !== -1) {
            draft.array.splice(index, 1); // 해당 항목 삭제
          }
        })
      );
    },
    // [data]
    // 교체 3-3
    []
  );

  // 실습2

  const onToggle = useCallback(
    (id) => {
      setData(
        //불변성 유지, 
        produce((draft) => {
          const item = draft.array.find((info) => info.id === id)
          if (item) {
            item.completed = !item.completed;
          }
        })
      )
    }
    , []
  )

  return (
    <div>
      <h1 className='react'>ch12 immer 이용한 불변성 유지 해보기</h1>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}
              // 실습2 추가
              onContextMenu={() => onToggle(info.id)}
              style={{ textDecoration: info.completed ? 'line-through' : 'none' }}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;