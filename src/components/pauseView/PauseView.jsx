import './pauseView.css';
import timerStore from '../../../timerStore';

const PauseView = () => {
    const breakTime = timerStore((state) => state.breakTime);
    const isBreakRunning = timerStore((state) => state.isBreakRunning); // Observera isBreakRunning

    // Omvandlar sekunder till minuter och sekunder
    const minutes = Math.floor(breakTime / 60);
    const seconds = breakTime % 60;

    return (
        <div>
            {isBreakRunning && (
                <div>
                    <h2 className='pausView-header'>Paus pågår</h2>
                    <span className='pausView-text--bold'>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</span>
                    <span className='pausView-text'> minuter kvar</span>
                </div>
            )}
        </div>
    );
};

export default PauseView
