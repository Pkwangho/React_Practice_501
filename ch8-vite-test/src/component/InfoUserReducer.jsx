import React, { useReducer } from 'react';

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value,
    };
}

const InfoUserReducer = () => {
    const [state, dispatch] = useReducer(reducer, {
        name: '',
        nickname: '',
    });

    const { name, nickname } = state;

    const onChange = (e) => {
        dispatch({
            name: e.target.name,
            value: e.target.value,
        });
    };

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange} placeholder="이름" />
                <input name="nickname" value={nickname} onChange={onChange} placeholder="닉네임" />
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default InfoUserReducer;