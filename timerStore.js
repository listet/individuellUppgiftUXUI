import { create } from 'zustand';
import Timer from 'easytimer.js';

const timerStore = create((set, get) => ({
    time: 10, // Startvärde för timern 
    isRunning: false,
    timerInstance: new Timer(),
    navigate: null,

    //Sätt tid
    setTime: (newTime) => {
        set({ time: newTime });
        // get().timerInstance.start({ countdown: true, startValues: { minutes: newTime } });
    },

    setNavigate: (navigateFunc) => {
        set({ navigate: navigateFunc });
    },

    // Starta timern
    startTimer: () => {
        const timer = get().timerInstance;
        const selectedTime = get().time;

        if (!get().isRunning) {
            set({ isRunning: true });
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