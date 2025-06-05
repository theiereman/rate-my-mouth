import { Button, Card, Input } from "@components/ui";
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
    <Card
      onClick={() => setIsOver(false)}
      className={`${isOver ? "border-4 border-primary-500" : ""}`}
    >
      <Card.Header className="flex">
        <h2
          data-timer="true"
          className="flex-1 text-xl font-semibold text-neutral-800 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-primary-600">
            timer
          </span>
          Minuteur
        </h2>
        {isOver && (
          <Button
            className="animate-pulse"
            icon={<span className="material-symbols-outlined">stop</span>}
            onClick={stopSound}
          >
            Arrêter
          </Button>
        )}
      </Card.Header>
      <div className="flex">
        <Input
          containerClassName="w-full"
          label="Heures"
          inputClassName="rounded-r-none rounded-bl-none"
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
          label="Minutes"
          inputClassName="rounded-none border-l-0 border-r-0"
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
          label="Secondes"
          inputClassName="rounded-l-none rounded-br-none"
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
          className="w-full rounded-none rounded-bl-lg"
          onClick={handleStart}
          disabled={isRunning || totalSeconds() <= 0}
        >
          Start
        </Button>
        <Button
          className="w-full rounded-none"
          onClick={handlePause}
          disabled={!isRunning}
        >
          Pause
        </Button>
        <Button
          className="w-full rounded-none rounded-br-lg"
          onClick={handleStop}
          disabled={!isRunning && !isPaused}
        >
          Stop
        </Button>
      </div>
    </Card>
  );
}
