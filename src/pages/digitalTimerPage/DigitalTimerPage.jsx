import Nav from '../../components/nav/Nav'
import timerStore from '../../../timerStore';
import './digitalTimerPage.css'
import PauseView from '../../components/pauseView/PauseView';
import AbortButton from '../../components/abortButton/AbortButton';

function DigitalTimerPage() {
    const time = timerStore((state) => state.time);
    const isRunning = timerStore((state) => state.isRunning);

    return (
        <section className="analogTimerPage-wrapper">
            <Nav />
            {isRunning && (
                <section className="timerDisplay">
                    <h2>{Math.floor(time)}:{Math.floor((time % 1) * 60).toString().padStart(2, '0')}</h2>
                </section>
            )}
            <PauseView />
            <AbortButton />
        </section>
    )
}

export default DigitalTimerPage
