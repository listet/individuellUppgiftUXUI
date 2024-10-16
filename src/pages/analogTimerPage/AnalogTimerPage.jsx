import Nav from "../../components/nav/Nav"
import './analogTimerPage.css'
import timerStore from "../../../timerStore";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

function AnalogTimerPage() {

    const time = timerStore((state) => state.time);
    // const isRunning = timerStore((state) => state.isRunning);
    const seconds = time % 60; // Få sekunder från tiden
    const minutes = Math.floor(time / 60) % 60; // Få minuter från tiden
    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360;

    const resetTimer = timerStore((state) => state.resetTimer);
    // KOlla upp tween 
    const abortTimer = () => {
        resetTimer(0); // Nollställ timern till 0
    };

    return (
        <section className="analogTimerPage-wrapper">
            <Nav />
            <section className="stopwatch-container">
                <motion.figure
                    className="second"
                    animate={{ rotate: secondDegrees }}
                    transition={{ ease: 'linear', duration: 1 }}
                />
                <motion.figure
                    className="minute"
                    animate={{ rotate: minuteDegrees }}
                    transition={{ type: 'tween', ease: 'linear', duration: 60 }}
                />
                <figure className="centercircle"></figure>
            </section>
            <Link
                aria-label='Navigate to set timer'
                to="/TimerPage"
                onClick={abortTimer}>
                <button className='abort-button'>ABORT TIMER</button>
            </Link>
        </section>
    )
}

export default AnalogTimerPage