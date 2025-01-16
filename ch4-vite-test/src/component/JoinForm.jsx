import React, { useState } from 'react';

const JoinForm = () => {
    // 화면과 데이터를 동기화 하기 위한 기본 값 설정.
    const [form, setForm] = useState(
        {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        }
    )
    // form 객체 안에 있는 각각의 멤버를 따로 변수로 재할당. 
    // 화면과 데이터 가 동기화 가 되어서, 사용 가능. 
    const { username, email, password, passwordConfirm } = form

    const onChange = (e) => {
        setForm(
            {
                //불변성 유지, 기존의 값을 가지고 와서, 새로운 값 추가. 
                ...form,
                [e.target.name]: e.target.value
            }
        )
    }

    const onClick = () => {
        if (!username || !email || !password || !passwordConfirm) {
            alert("모든 값을 입력해주세요.")
            return
        }
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }
        alert("회원 가입 완료.")
        // 기존에 입력 했던 내용을 다 비우기. 
        setForm({
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        })
    }

    return (
        <>
            <h1 className='react'>실습 , 회원가입화면 만들기.</h1>
            <input type='text' name='username' placeholder='사용자명'
                value={username} onChange={onChange} />
            <input type='text' name='email' placeholder='이메일'
                value={email} onChange={onChange} />
            <input type='password' name='password' placeholder='패스워드'
                value={password} onChange={onChange} />
            <input type='password' name='passwordConfirm' placeholder='패스워드확인'
                value={passwordConfirm} onChange={onChange} />
            <button onClick={onClick}>로그인</button>
        </>
    );

};

export default JoinForm;