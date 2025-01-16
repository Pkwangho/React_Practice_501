
import React, { Component } from 'react';

class EventPractice extends Component {
    //추가1
    state = {
        // 추가 4-1
        username: '',
        message: ''
    };

    // 추가 2-1
    // 방법1
    // constructor(props) {
    //     super(props);
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleClick = this.handleClick.bind(this);
    // }
    // 추가 2-2
    // handleChange(e) {
    //     this.setState({
    //         message: e.target.value
    //     });
    // }
    // 추가 2-3
    // handleClick() {
    //     alert(this.state.message);
    //     this.setState({
    //         message: ''
    //     });
    // }

    // 추가 3-1 
    // 방법2
    handleChange = (e) => {
        this.setState({
            //추가 4-2
            // message: e.target.value
            // e.target.name, 예) <input 가리킴. 
            // e.target.value, 예) <input 의 값 가리킴. 
            [e.target.name]: e.target.value
        });
    };

    handleClick = () => {
        // alert(this.state.message);
        // this.setState({
        //     message: ''
        // });
        // 추가 4-3
        alert(this.state.username + ': ' + this.state.message);
        this.setState({
            username: '',
            message: ''
        });
    };

    //추가 5-1 , 키 이벤트 
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습, 클래스형 컴포넌트</h1>
                <h2>message : {this.state.message}</h2>
                <h2>username : {this.state.username}</h2>
                {/* 방법1 */}
                {/* <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    //추가2,
                    value={this.state.message}
                    //추가3
                    onChange={(e) => {
                        //추가3-2, 이부분 가장 중요함.
                        this.setState({
                            message: e.target.value
                        });
                    }}
                />
                <button
                    onClick={() => {
                        alert(this.state.message);
                        this.setState({ message: "" });
                    }}
                >
                    초기화
                </button> */}

                {/* 방법2, 함수를 따로 분리해서 작업 */}
                {/* e.target.name =>name="message" */}
                {/* e.target.value =>value="" 의값 */}
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={this.handleChange}
                    // 추가 5-2
                    onKeyPress={this.handleKeyPress}
                />


                {/* 추가 4-4 */}
                {/* e.target.name =>name="username" */}
                {/* e.target.value =>value="" 의값 */}
                <input
                    type="text"
                    name="username"
                    placeholder="사용자명"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>확인</button>
            </div>
        );
    }
}

export default EventPractice;