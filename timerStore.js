import { create } from 'zustand';
import Timer from 'easytimer.js';

const timerStore = create((set, get) => ({
    time: 10,
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

    //Funktion för att sätta en ny tid
    setTime: (newTime) => {
        set({ time: newTime });
    },

    // Funktion för att sätta ny initial tid (i sekunder för att beräkna visar-position på analog klocka)
    setInitialTime: (newInitialTime) => {
        set({ initialTime: newInitialTime * 60 });
    },

    // Funktion för att sätta navigations-funktionen
    setNavigate: (navigateFunc) => {
        set({ navigate: navigateFunc });
    },

    // Sätt ny vinkel för sekundvisaren
    setSecondDegrees: (newsecondDegrees) => {
        set({ secondDegrees: newsecondDegrees })
    },

    // Sätt ny vinkel för minutvisaren
    setMinuteDegrees: (newMinuteDegrees) => {
        set({ minuteDegrees: newMinuteDegrees })
    },

    // Aktivera/inaktivera intervall-läge
    setIntervalsEnabled: (enabled) => {
        set({ intervalsEnabled: enabled });
    },

    // Aktivera/inaktivera paus-läge
    setBreakEnabled: (enabled) => {
        set({ breakEnabled: enabled });
    },

    // Sätter tillbaka pauslängd
    setBreakTime: (newBreakTime) => {
        set({ breakTime: newBreakTime });
    },

    // Funktion för att hämta total tid i sekunder från timer-instansen 
    // (används för att räkna ut position på visarna i den analoga klockan)
    getTotalTimeInSeconds: () => {
        const timeValues = get().timerInstance.getTimeValues();
        return timeValues.minutes * 60 + timeValues.seconds;
    },


    // Starta timern
    startTimer: async () => {
        const timer = get().timerInstance;
        const selectedTime = get().time;

        if (!get().isRunning) {
            set({ isRunning: true });
            set({ initialTime: selectedTime * 60 });
            timer.start({ countdown: true, startValues: { minutes: Math.floor(selectedTime) } });

            // Ta bort tidigare lyssnare för att förhindra duplicering
            timer.removeEventListener('secondsUpdated');
            timer.removeEventListener('targetAchieved');

            // Uppdatera timer-tid varje sekund
            timer.addEventListener('secondsUpdated', () => {
                const timeValues = timer.getTimeValues();
                set({ time: timeValues.minutes + timeValues.seconds / 60 });
            });

            // När timern når noll
            timer.addEventListener('targetAchieved', async () => {
                set({ isRunning: false });
                console.log('Tiden är slut!');

                const navigate = get().navigate;
                if (navigate) {
                    if (!get().breakEnabled && !get().intervalsEnabled) {
                        await navigate('/AlarmViewPage');
                    }

                    // Starta paus-timern om paus är aktiverad
                    if (get().breakEnabled) {
                        console.log('Paus på 5 minuter startar.');
                        await get().startBreakTimer();
                    }

                    // Om intervaller är aktiverat: Vänta 2 sekunder och starta om timern
                    if (get().intervalsEnabled) {
                        setTimeout(async () => {
                            console.log('Återgår till timern.');
                            set({ time: get().initialTime / 60 });
                            await get().startTimer();
                        }, 2000); // Kort paus mellan intervallerna
                    }
                }
            });
        }
    },

    // Starta paus-timern
    startBreakTimer: async () => {
        const breakTimer = get().breakTimerInstance;

        breakTimer.stop();

        set({ breakTime: 5 * 60, isBreakRunning: true }); // Återställ till 5 minuter
        breakTimer.start({ countdown: true, startValues: { minutes: 5 } });

        breakTimer.removeEventListener('secondsUpdated');
        breakTimer.removeEventListener('targetAchieved');

        // Uppdatera paus-tiden 
        breakTimer.addEventListener('secondsUpdated', () => {
            const timeValues = breakTimer.getTimeValues();
            set({ breakTime: timeValues.minutes * 60 + timeValues.seconds });
        });

        // När pausen är slut
        breakTimer.addEventListener('targetAchieved', async () => {
            console.log('Pausen är över, återgår till timern.');
            set({ isBreakRunning: false });
            set({ time: get().initialTime / 60 });
            await get().startTimer();
        });
    },

    // Nollställ timern och paus-timer
    resetTimer: () => {
        get().timerInstance.stop();
        get().breakTimerInstance.stop();
        set({ time: 10, isRunning: false, breakTime: 5 * 60, isBreakRunning: false });
    },
}));

export default timerStore;