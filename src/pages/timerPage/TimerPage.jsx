import './timerPage.css'
import decrement from '../../assets/decrement.png'
import increment from '../../assets/increment.png'
import Nav from '../../components/nav/Nav'
import timerStore from '../../../timerStore'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function TimerPage() {

    const time = timerStore((state) => state.time);
    const setTime = timerStore((state) => state.setTime);
    const startTimer = timerStore((state) => state.startTimer);
    const navigate = useNavigate(); // Hämta navigeringsfunktion
    const setNavigate = timerStore((state) => state.setNavigate);

    useEffect(() => {
        setNavigate(navigate);
    }, [navigate, setNavigate]);

    const handleDecrease = () => {
        if (time > 1) { // Sätter en mingräns för minuter
            setTime(time - 1);
        }
    };

    const handleIncrease = () => {
        if (time < 60) {
            setTime(time + 1);
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
            <section>
                <p>box</p>
                <p>box</p>
                <Link
                    aria-label='Navigate to countdown'
                    to="/AnalogTimerPage">
                    <button
                        className='startTimer-button'
                        onClick={startTimer}
                    > START TIMER</button>
                </Link>
            </section>
        </section>
    )
}

export default TimerPage
