import './App.css'
import { Route, Routes } from 'react-router-dom'
import FrontPage from './pages/frontPage/FrontPage'
import TimerPage from './pages/timerPage/TimerPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/TimerPage" element={<TimerPage />} />
      </Routes>
    </>
  )
}

export default App
