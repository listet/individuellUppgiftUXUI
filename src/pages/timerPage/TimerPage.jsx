import './timerPage.css'
import decrement from '../../assets/decrement.png'
import increment from '../../assets/increment.png'
import Nav from '../../components/nav/Nav'

function TimerPage() {
    return (
        <section className="timerPage-wrapper">
            <Nav />
            <section className='minutesSelector-wrapper'>
                <img src={decrement} alt="decrement" className='decrement' />
                <figure className='minutesDecider-container'>
                    <h2 className='minutesDecider'>10</h2>
                    <p className='timePage-minutesText'>minutes</p>
                </figure>
                <img src={increment} alt="increment" className='decrement' />
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
