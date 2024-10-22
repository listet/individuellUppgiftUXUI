import { create } from 'zustand';
import Timer from 'easytimer.js';

const timerStore = create((set, get) => ({
    time: 10, // Startvärde för timern 
    initialTime: 10 * 60,
    isRunning: false,
    breakTime: 5 * 60,
    isBreakRunning: false,
    timerInstance: new Timer(),
    breakTimerInstance: new Timer(),
    navigate: null,
    secondDegrees: 0,
    minuteDegrees: 0,
    intervalsEnabled: false,
    breakEnabled: false,

    //Sätt tid
    setTime: (newTime) => {
        set({ time: newTime });
    },

    setInitialTime: (newInitialTime) => {
        set({ initialTime: newInitialTime * 60 });
    },

    setNavigate: (navigateFunc) => {
        set({ navigate: navigateFunc });
    },

    setSecondDegrees: (newsecondDegrees) => {
        set({ secondDegrees: newsecondDegrees })
    },
    setMinuteDegrees: (newMinuteDegrees) => {
        set({ minuteDegrees: newMinuteDegrees })
    },

    setIntervalsEnabled: (enabled) => {
        set({ intervalsEnabled: enabled });
    },

    setBreakEnabled: (enabled) => {
        set({ breakEnabled: enabled });
    },

    setBreakTime: (newBreakTime) => {
        set({ breakTime: newBreakTime });
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
                    if (!get().breakEnabled && !get().intervalsEnabled) {
                        navigate('/AlarmViewPage');
                    }

                    if (get().breakEnabled) {
                        console.log('Paus på 5 minuter startar.');
                        get().startBreakTimer();
                    }

                    if (get().intervalsEnabled) {
                        setTimeout(() => {
                            console.log('Återgår till timern.');
                            set({ time: get().initialTime / 60 });
                            get().startTimer();
                            navigate('/AnalogTimerPage');
                        }, 3000); // Kort paus mellan
                    }
                }
            });
        }
    },

    startBreakTimer: () => {
        const breakTimer = get().breakTimerInstance;

        set({ breakTime: 5 * 60, isBreakRunning: true }); // Återställ till 5 minuter
        breakTimer.start({ countdown: true, startValues: { minutes: 5 } });

        breakTimer.addEventListener('secondsUpdated', () => {
            const timeValues = breakTimer.getTimeValues();
            set({ breakTime: timeValues.minutes * 60 + timeValues.seconds });
        });

        breakTimer.addEventListener('targetAchieved', () => {
            console.log('Pausen är över, återgår till timern.');
            set({ isBreakRunning: false });
            set({ time: get().initialTime / 60 });
            get().startTimer();
            const navigate = get().navigate;
            if (navigate) {
                navigate('/AnalogTimerPage');
            }
        });
    },

    // Nollställ timern
    resetTimer: () => {
        get().timerInstance.stop();
        get().breakTimerInstance.stop();
        set({ time: 10, isRunning: false, breakTime: 5 * 60, isBreakRunning: false });
    },
}));

export default timerStore;