import { Button, Card, Input } from "@components/ui";
import { useState, useRef } from "react";
import alarmSound from "../../assets/sounds/alert.wav";

export default function Timer() {
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
    <Card
      onClick={() => setIsOver(false)}
      className={`${isOver ? "border-4 border-primary-500" : ""}`}
    >
      <Card.Header className="flex">
        <h2 className="flex-1 text-xl font-semibold text-neutral-800 flex items-center gap-2">
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
          onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
          disabled={isRunning}
        />
        <Input
          containerClassName="w-full"
          label="Minutes"
          inputClassName="rounded-none border-l-0 border-r-0"
          type="number"
          value={minutes}
          onChange={(e) =>
            setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))
          }
          disabled={isRunning}
        />
        <Input
          containerClassName="w-full"
          label="Secondes"
          inputClassName="rounded-l-none rounded-br-none"
          type="number"
          value={seconds}
          onChange={(e) =>
            setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))
          }
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
