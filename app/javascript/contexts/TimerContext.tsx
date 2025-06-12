import React, { createContext, useContext, useState, ReactNode } from "react";

interface TimerContextType {
  addTime: (hours: number, minutes: number, seconds: number) => void;
  timerState: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  setTime: (hours: number, minutes: number, seconds: number) => void;
  setTimerState: React.Dispatch<
    React.SetStateAction<{
      hours: number;
      minutes: number;
      seconds: number;
    }>
  >;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timerState, setTimerState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const addTime = (hours: number, minutes: number, seconds: number) => {
    setTimerState((prev) => ({
      hours: prev.hours + hours,
      minutes: prev.minutes + minutes,
      seconds: prev.seconds + seconds,
    }));
  };

  const setTime = (hours: number, minutes: number, seconds: number) => {
    setTimerState({ hours, minutes, seconds });
  };

  return (
    <TimerContext.Provider
      value={{ addTime, setTime, timerState, setTimerState }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
