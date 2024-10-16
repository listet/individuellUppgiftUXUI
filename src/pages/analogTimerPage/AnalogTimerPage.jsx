import Nav from "../../components/nav/Nav"
import './analogTimerPage.css'
import timerStore from "../../../timerStore";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

function AnalogTimerPage() {

    const time = timerStore((state) => state.time);
    const isRunning = timerStore((state) => state.isRunning);
    const seconds = time % 60; // Få sekunder från tiden
    const minutes = Math.floor(time / 60) % 60; // Få minuter från tiden

    return (
        <section className="analogTimerPage-wrapper">
            <Nav />
            <h1>Analog timer Page</h1>
            {isRunning && (
                <section className="timerDisplay">
                    <h2>{Math.floor(time)}:{Math.floor((time % 1) * 60).toString().padStart(2, '0')}</h2>
                </section>
            )}
            <Link
                aria-label='Navigate to set timer'
                className='abort-button'
                to="/TimerPage">
                {/* Något rom resetar Timer */}
                <button>ABORT TIMER</button>
            </Link>
        </section>
    )
}

export default AnalogTimerPage
