import { Button, Input } from "@components/ui";
import { useState, useRef } from "react";
import alarmSound from "../../assets/sounds/alert.wav";

export default function Timer({ className = "" }: { className?: string }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
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
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) return prevSeconds - 1;

          setMinutes((prevMinutes) => {
            if (prevMinutes > 0) {
              setSeconds(59);
              return prevMinutes - 1;
            }

            setHours((prevHours) => {
              if (prevHours > 0) {
                setMinutes(59);
                setSeconds(59);
                return prevHours - 1;
              }

              clearInterval(timerRef.current!);
              playSound();
              handleStop();
              setIsOver(true);
              return 0;
            });

            return 0;
          });

          return 0;
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
    setHours(0);
    setMinutes(0);
    setSeconds(0);
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
      className={`${
        isOver ? "p-1! rounded-lg border-4 border-primary-500" : ""
      } ${className}`}
    >
      <div className="flex">
        <Input
          containerClassName="w-full"
          inputClassName="rounded-r-none rounded-bl-none p-1!"
          type="number"
          value={hours}
          onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
          onFocus={(e) => e.target.select()}
          disabled={isRunning}
        />
        <Input
          containerClassName="w-full"
          inputClassName="rounded-none border-l-0 border-r-0 p-1!"
          type="number"
          value={minutes}
          onChange={(e) =>
            setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))
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
            setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))
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
