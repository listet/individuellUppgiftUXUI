import Nav from '../../components/nav/Nav'
import timerStore from '../../../timerStore';
import { Link } from 'react-router-dom';
import './digitalTimerPage.css'

function DigitalTimerPage() {
    const time = timerStore((state) => state.time);
    const isRunning = timerStore((state) => state.isRunning);

    const resetTimer = timerStore((state) => state.resetTimer);
    const abortTimer = () => {
        resetTimer(10); // Nollställ timern 
    };

    return (
        <section className="analogTimerPage-wrapper">
            <Nav />
            {/* Gömmer timerdisplayen tills timern startas */}
            {isRunning && (
                <section className="timerDisplay">
                    <h2>{Math.floor(time)}:{Math.floor((time % 1) * 60).toString().padStart(2, '0')}</h2>
                </section>
            )}
            <Link
                aria-label='Navigate to set timer'
                to="/TimerPage"
                onClick={abortTimer}>
                <button className='abort-button'>ABORT TIMER</button>
            </Link>
        </section>
    )
}

export default DigitalTimerPage
