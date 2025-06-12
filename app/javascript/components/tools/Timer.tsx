import { Button, Input } from "@components/ui";
import { useState, useRef, useEffect } from "react";
import { useTimer } from "@contexts/TimerContext";
import alarmSound from "../../assets/sounds/alert.wav";

export default function Timer() {
  const { timerState, setTimerState } = useTimer();
  const { hours, minutes, seconds } = timerState;

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audio = useRef(new Audio(alarmSound));

  const totalSeconds = () => hours * 3600 + minutes * 60 + seconds;

  const handleStart = () => {
    if (totalSeconds() > 0 && !isRunning) {
      setIsOver(false);
      setIsRunning(true);
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setTimerState((prev) => {
          const newSeconds =
            prev.seconds > 0
              ? prev.seconds - 1
              : prev.minutes > 0
              ? 59
              : prev.hours > 0
              ? 59
              : 0;

          const newMinutes =
            prev.seconds > 0
              ? prev.minutes
              : prev.minutes > 0
              ? prev.minutes - 1
              : prev.hours > 0
              ? 59
              : 0;

          const newHours =
            prev.seconds > 0 || prev.minutes > 0
              ? prev.hours
              : prev.hours > 0
              ? prev.hours - 1
              : 0;

          if (newHours === 0 && newMinutes === 0 && newSeconds === 0) {
            clearInterval(timerRef.current!);
            playSound();
            handleStop();
            setIsOver(true);
          }

          return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsPaused(true);
      setIsRunning(false);
      clearInterval(timerRef.current!);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsOver(false);
    clearInterval(timerRef.current!);
    setTimerState({ hours: 0, minutes: 0, seconds: 0 });
  };

  const playSound = () => {
    if (!audio.current) return;
    audio.current.loop = true;
    audio.current.play();
  };

  const stopSound = () => {
    if (!audio.current) return;
    audio.current.pause();
  };

  return (
    <div
      data-timer="true"
      className={`${
        isOver ? "p-1! rounded-lg border-4 border-primary-500" : ""
      }`}
    >
      <div className="flex">
        <Input
          containerClassName="w-full"
          inputClassName="rounded-r-none rounded-bl-none p-1!"
          type="number"
          value={hours}
          onChange={(e) =>
            setTimerState((prev) => ({
              ...prev,
              hours: Math.max(0, Number(e.target.value)),
            }))
          }
          onFocus={(e) => e.target.select()}
          disabled={isRunning}
        />
        <Input
          containerClassName="w-full"
          inputClassName="rounded-none border-l-0 border-r-0 p-1!"
          type="number"
          value={minutes}
          onChange={(e) =>
            setTimerState((prev) => ({
              ...prev,
              minutes: Math.max(0, Math.min(59, Number(e.target.value))),
            }))
          }
          onFocus={(e) => e.target.select()}
          disabled={isRunning}
        />
        <Input
          containerClassName="w-full"
          inputClassName="rounded-l-none rounded-br-none p-1!"
          type="number"
          value={seconds}
          onChange={(e) =>
            setTimerState((prev) => ({
              ...prev,
              seconds: Math.max(0, Math.min(59, Number(e.target.value))),
            }))
          }
          onFocus={(e) => e.target.select()}
          disabled={isRunning}
        />
      </div>
      <div className="flex w-full">
        <Button
          className="py-1 w-full rounded-none rounded-bl-lg"
          onClick={handleStart}
          disabled={isRunning || totalSeconds() <= 0}
        >
          Start
        </Button>
        <Button
          className="py-1 w-full rounded-none"
          onClick={handlePause}
          disabled={!isRunning}
        >
          Pause
        </Button>
        <Button
          className={`py-1 w-full rounded-none rounded-br-lg ${
            isOver ? "animate-pulse" : ""
          }`}
          onClick={() => {
            handleStop();
            stopSound();
          }}
          disabled={!isRunning && !isPaused && !isOver}
        >
          Stop
        </Button>
      </div>
    </div>
  );
}
