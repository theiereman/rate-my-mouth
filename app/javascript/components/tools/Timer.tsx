import { Button, Section } from "@components/ui";
import { useState, useRef } from "react";
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
    <Section
      title="Minuteur"
      variant="no-padding"
      data-timer="true"
      className={`p-0 ${isOver ? "border-red-500" : ""}`}
    >
      <div className="flex items-center justify-center font-bold">
        <input
          type="number"
          className="w-16 border-none bg-transparent text-center text-3xl ring-0"
          value={hours.toString().padStart(2, "0")}
          onChange={(e) =>
            setTimerState((prev) => ({
              ...prev,
              hours: Math.max(0, Number(e.target.value)),
            }))
          }
          onFocus={(e) => e.target.select()}
          disabled={isRunning}
        />
        <span className="pb-1 text-3xl">:</span>
        <input
          type="number"
          className="w-16 border-none bg-transparent text-center text-3xl ring-0"
          value={minutes.toString().padStart(2, "0")}
          onChange={(e) =>
            setTimerState((prev) => ({
              ...prev,
              minutes: Math.max(0, Math.min(59, Number(e.target.value))),
            }))
          }
          onFocus={(e) => e.target.select()}
          disabled={isRunning}
        />
        <span className="pb-1 text-3xl">:</span>

        <input
          type="number"
          className="w-16 border-none bg-transparent text-center text-3xl ring-0"
          value={seconds.toString().padStart(2, "0")}
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
          className="w-full"
          onClick={handleStart}
          disabled={isRunning || totalSeconds() <= 0}
        >
          Start
        </Button>
        <Button className="w-full" onClick={handlePause} disabled={!isRunning}>
          Pause
        </Button>
        <Button
          className={`w-full ${isOver ? "animate-pulse" : ""}`}
          onClick={() => {
            handleStop();
            stopSound();
          }}
          disabled={!isRunning && !isPaused && !isOver}
        >
          Stop
        </Button>
      </div>
    </Section>
  );
}
