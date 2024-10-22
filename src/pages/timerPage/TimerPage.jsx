import './timerPage.css'
import decrement from '../../assets/decrement.png'
import increment from '../../assets/increment.png'
import Nav from '../../components/nav/Nav'
import timerStore from '../../../timerStore'
import { Link, useNavigate } from 'react-router-dom'
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
        setIntervalsEnabled(e.target.checked);
    };

    // Aktivera/inaktivera break
    const handleBreakChange = (e) => {
        setBreakEnabled(e.target.checked);
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
                <Link
                    aria-label='Navigate to countdown'
                    to="/AnalogTimerPage">
                    <motion.button
                        className='startTimer-button'
                        onClick={startTimer}
                        whileHover={{ backgroundColor: '#22222240' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        START TIMER
                    </motion.button>
                </Link>
            </section>
        </section>
    )
}

export default TimerPage
