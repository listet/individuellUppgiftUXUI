import './timerPage.css'
import decrement from '../../assets/decrement.png'
import increment from '../../assets/increment.png'
import Nav from '../../components/nav/Nav'
import timerStore from '../../../timerStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

function TimerPage() {

    const time = timerStore((state) => state.time);
    const setTime = timerStore((state) => state.setTime);
    const startTimer = timerStore((state) => state.startTimer);
    const navigate = useNavigate();
    const setNavigate = timerStore((state) => state.setNavigate);
    const intervalsEnabled = timerStore((state) => state.intervalsEnabled);
    const setIntervalsEnabled = timerStore((state) => state.setIntervalsEnabled);
    const breakEnabled = timerStore((state) => state.breakEnabled);
    const setBreakEnabled = timerStore((state) => state.setBreakEnabled);

    // useEffect för att uppdatera navigationsfunktionen i Zustand store när komponenten laddas
    useEffect(() => {
        setNavigate(navigate);
    }, [navigate, setNavigate]);

    const handleDecrease = () => {
        if (time > 1) {
            setTime(time - 1);
        }
    };

    const handleIncrease = () => {
        if (time < 60) {
            setTime(time + 1);
        }
    };

    // Aktivera/inaktivera intervall
    const handleIntervalChange = (e) => {
        const isChecked = e.target.checked;
        setIntervalsEnabled(isChecked);
        if (isChecked) {
            setBreakEnabled(false);
        }
    };

    // Aktivera/inaktivera break
    const handleBreakChange = (e) => {
        const isChecked = e.target.checked;
        setBreakEnabled(isChecked);
        if (isChecked) {
            setIntervalsEnabled(false);
        }
    };

    return (
        <section className="timerPage-wrapper">
            <Nav />
            <section className='minutesSelector-wrapper'>
                <img src={decrement}
                    alt="decrement"
                    className='decrement'
                    onClick={handleDecrease} />
                <figure className='minutesDecider-container'>
                    <h2 className='minutesDecider'>{Math.floor(time)}</h2>
                    <p className='timePage-minutesText'>minutes</p>
                </figure>
                <img src={increment}
                    alt="increment"
                    className='decrement'
                    onClick={handleIncrease} />
            </section>
            <section className='startTimer-container'>
                <article className='checkbox-container'>
                    <input
                        className='intervals-box'
                        type="checkbox"
                        name="intervals"
                        id="intervals"
                        checked={intervalsEnabled}
                        onChange={handleIntervalChange}
                    />
                    <p className='inline-text'>Intervals</p>
                </article>
                <article className='checkbox-container'>
                    <input
                        className='intervals-box'
                        type="checkbox"
                        name="break"
                        id="break"
                        checked={breakEnabled}
                        onChange={handleBreakChange}
                    />
                    <p className='inline-text'>5 min break / interval</p>
                </article>
                <motion.button
                    className='startTimer-button'
                    onClick={() => {
                        startTimer();
                        navigate('/AnalogTimerPage');
                    }}
                    whileHover={{ backgroundColor: '#22222240' }}
                    whileTap={{
                        scale: 0.95,
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                        transition: { duration: 0.05 }
                    }}
                >
                    START TIMER
                </motion.button>
            </section>
        </section>
    )
}

export default TimerPage
