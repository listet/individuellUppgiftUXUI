import Nav from '../../components/nav/Nav'
import timerStore from '../../../timerStore';
import './textTimerPage.css'
import { useEffect, useState } from 'react';
import PauseView from '../../components/pauseView/PauseView';
import AbortButton from '../../components/abortButton/AbortButton';

function TextTimerPage() {
    const time = timerStore((state) => state.time);
    const isRunning = timerStore((state) => state.isRunning);
    const [formattedTime, setFormattedTime] = useState('');

    const numberToText = (number) => {
        const numbersInSwedish = [
            'NOLL', 'EN', 'TVÅ', 'TRE', 'FYRA', 'FEM', 'SEX',
            'SJU', 'ÅTTA', 'NIO', 'TIO', 'ELVA', 'TOLV',
            'TRETTON', 'FJORTON', 'FEMTON', 'SEXTON', 'SJUTTON',
            'ARTON', 'NITTON', 'TJUGO', 'TJUGOEN', 'TJUGOTVÅ',
            'TJUGOTRE', 'TJUGOFYRA', 'TJUGOFEM', 'TJUGOSEX',
            'TJUGOSJU', 'TJUGOÅTTA', 'TJUGONIO', 'TRETTIO',
            'TRETTIOEN', 'TRETTIOTVÅ', 'TRETTIOTRE', 'TRETTIOFYRA',
            'TRETTIOFEM', 'TRETTIOSEX', 'TRETTIOSJU', 'TRETTIOÅTTA',
            'TRETTIONIO', 'FYRTIO', 'FYRTIOEN', 'FYRTIOTVÅ',
            'FYRTIOTRE', 'FYRTIOFYRA', 'FYRTIOFEM', 'FYRTIOSEX',
            'FYRTIOSJU', 'FYRTIOÅTTA', 'FYRTIONIO', 'FEMTIO',
            'FEMTIOEN', 'FEMTIOTVÅ', 'FEMTIOTRE', 'FEMTIOFYRA',
            'FEMTIOFEM', 'FEMTIOSEX', 'FEMTIOSJU', 'FEMTIOÅTTA',
            'FEMTIONIO',
        ];

        return numbersInSwedish[number] || `${number}`;
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds);
        const seconds = Math.round((timeInSeconds % 1) * 60); // Runda sekunder
        return `${numberToText(minutes)} MINUTER OCH ${numberToText(seconds)} SEKUNDER KVAR`;
    };

    useEffect(() => {
        const newFormattedTime = formatTime(time);
        setFormattedTime(newFormattedTime);
    }, [time]);

    return (
        <section className="analogTimerPage-wrapper">
            <Nav />
            {isRunning && (
                <section className="textTimerDisplay">
                    <h5>{formattedTime}</h5>
                </section>
            )}
            <PauseView />
            <AbortButton />
        </section>
    )
}


export default TextTimerPage





