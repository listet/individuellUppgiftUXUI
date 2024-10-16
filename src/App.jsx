import './App.css'
import { Route, Routes } from 'react-router-dom'
import FrontPage from './pages/frontPage/FrontPage'
import TimerPage from './pages/timerPage/TimerPage'
import AnalogTimerPage from './pages/analogTimerPage/AnalogTimerPage'
import DigitalTimerPage from './pages/digitalTimerPage/DigitalTimerPage'
import TextTimerPage from './pages/textTimerPage/TextTimerPage'
import AlarmViewPage from './pages/alarmViewPage/AlarmViewPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/TimerPage" element={<TimerPage />} />
        <Route path="/AnalogTimerPage" element={<AnalogTimerPage />} />
        <Route path="/DigitalTimerPage" element={<DigitalTimerPage />} />
        <Route path="/TextTimerPage" element={<TextTimerPage />} />
        <Route path="/AlarmViewPage" element={<AlarmViewPage />} />
      </Routes>
    </>
  )
}

export default App
