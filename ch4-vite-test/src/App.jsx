import './App.css'
import EventPractice from './component/EventPractice'
import EventPractice2 from './component/EventPractice2'
import JoinForm from './component/JoinForm'
import LoginForm from './component/LoginFom'
import Say from './component/Say'

function App() {

  return (
    <>
      <h1 className='react'>ch4 이벤트 핸들러 해보기</h1>
      {/* <Say />
      <EventPractice />
      <EventPractice2 /> */}
      <LoginForm />
      <JoinForm />
    </>
  )
}

export default App
