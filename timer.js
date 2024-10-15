import { create } from 'zustand';

const timerStore = create((set, get) => ({
    time: 10, // Startvärde för timern 
    isRunning: false, // För att hålla koll på om timern körs
    intervalId: null,

    //Sätt tid
    setTime: (newTime) => {
        set({ time: newTime });
    },

    // Starta timern
    startTimer: () => {
        if (!get().isRunning) {
            set({ isRunning: true });
            const interval = setInterval(() => {
                const currentTime = get().time;
                if (currentTime > 0) {
                    set({ time: currentTime - 1 });
                } else {
                    clearInterval(get().intervalId);
                    set({ isRunning: false });
                }
            }, 1000);
            set({ intervalId: interval });
        }
    },

    // Pausa timern
    stopTimer: () => {
        set({ isRunning: false });
        clearInterval(get().intervalId);
    },

    // Nollställ timern
    resetTimer: (newTime) => {
        set({ time: newTime, isRunning: false });
        clearInterval(get().intervalId);
    },
}));

export default timerStore;