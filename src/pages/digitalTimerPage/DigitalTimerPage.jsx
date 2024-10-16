import Nav from '../../components/nav/Nav'
import timerStore from '../../../timerStore';
import { Link } from 'react-router-dom';

function DigitalTimerPage() {
    const time = timerStore((state) => state.time);
    const isRunning = timerStore((state) => state.isRunning);

    return (
        <section className="analogTimerPage-wrapper">
            <Nav />
            <h1>Digital timer Page</h1>
            {/* Gömmer timerdisplayen tills timern startas */}
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

export default DigitalTimerPage
