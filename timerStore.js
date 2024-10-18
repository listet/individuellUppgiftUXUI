import { create } from 'zustand';
import Timer from 'easytimer.js';

const timerStore = create((set, get) => ({
    time: 10, // Startvärde för timern 
    initialTime: 10 * 60,
    isRunning: false,
    timerInstance: new Timer(),
    navigate: null,
    secondDegrees: 0,
    minuteDegrees: 0,
    setSecondDegrees: (newsecondDegrees) => {
        set({ secondDegrees: newsecondDegrees })
    },
    setMinuteDegrees: (newMinuteDegrees) => {
        set({ minuteDegrees: newMinuteDegrees })
    },

    //Sätt tid
    setTime: (newTime) => {
        set({ time: newTime });
    },

    setInitialTime: (newInitialTime) => {
        set({ initialTime: newInitialTime * 60 }); // Uppdatera initialTime när timern startas
    },

    setNavigate: (navigateFunc) => {
        set({ navigate: navigateFunc });
    },

    getTotalTimeInSeconds: () => {
        const timeValues = get().timerInstance.getTimeValues();
        return timeValues.minutes * 60 + timeValues.seconds;
    },

    // Starta timern
    startTimer: () => {
        const timer = get().timerInstance;
        const selectedTime = get().time;

        if (!get().isRunning) {
            set({ isRunning: true });
            set({ initialTime: selectedTime * 60 });
            timer.start({ countdown: true, startValues: { minutes: Math.floor(selectedTime) } });
            timer.addEventListener('secondsUpdated', () => {
                const timeValues = timer.getTimeValues();
                set({ time: timeValues.minutes + timeValues.seconds / 60 });
            });
            timer.addEventListener('targetAchieved', () => {
                set({ isRunning: false });
                console.log('Tiden är slut!');
                const navigate = get().navigate;
                if (navigate) {
                    navigate('/AlarmViewPage');
                }
            });
        }
    },

    // // Pausa timern
    // stopTimer: () => {
    //     set({ isRunning: false });
    //     get().timerInstance.pause();
    // },

    // Nollställ timern
    resetTimer: (newTime) => {
        get().timerInstance.stop();
        set({ time: newTime, isRunning: false });
    },
}));

export default timerStore;