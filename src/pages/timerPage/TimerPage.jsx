import './timerPage.css'
import decrement from '../../assets/decrement.png'
import increment from '../../assets/increment.png'
import Nav from '../../components/nav/Nav'
import timerStore from '../../../timer'

function TimerPage() {

    const time = timerStore((state) => state.time); // Direkt hämtning av state
    const setTime = timerStore((state) => state.setTime); // Direkt hämtning av setter


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
                    <h2 className='minutesDecider'>{time}</h2>
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
                <button className='startTimer-button'>START TIMER</button>
            </section>
        </section>
    )
}

export default TimerPage
