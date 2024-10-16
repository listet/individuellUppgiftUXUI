import './alarmViewPage.css'
import AlarmIcon from '../../assets/alarm icon.png'
import { Link } from 'react-router-dom'

function AlarmViewPage() {
    return (
        <section className="alarmPage-wrapper">
            <article className='alarmIcon-container'>
                <img src={AlarmIcon} alt="Alarm icon" />
                <h1 className='alarmPage-text'>Times up!</h1>
            </article>
            <Link
                aria-label='Navigate to setTimer'
                to="/TimerPage">
                <button className='newTimer-button'>SET NEW TIMER</button>
            </Link>
        </section>
    )
}

export default AlarmViewPage