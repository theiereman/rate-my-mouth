import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import consumer from "../../channels/consumer";
import { PageProps } from "@customTypes/usepage-props.types";
import { usePage } from "@inertiajs/react";

export default function UserLevel() {
  const { current_user } = usePage<PageProps>().props;
  const [level, setLevel] = useState<number>(current_user.current_level);
  const [levelProgressPercentage, setLevelProgressPercentage] =
    useState<number>(current_user.level_progress_percentage);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const plusOneRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, {
        width: `${Math.min(levelProgressPercentage, 100)}%`,
      });
    }
  }, []);

  useEffect(() => {
    const subscription = consumer.subscriptions.create("ExperienceChannel", {
      received(data) {
        if (data.level) {
          if (data.level > level && plusOneRef.current) {
            gsap.to(plusOneRef.current, { opacity: 1, duration: 0.3 });
            setTimeout(() => {
              if (plusOneRef.current) {
                gsap.to(plusOneRef.current, { opacity: 0, duration: 0.3 });
              }
              setLevel(data.level);
            }, 1000);
          } else {
            setLevel(data.level);
          }
        }
        if (data.level_progress_percentage) {
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              width: `${Math.min(data.level_progress_percentage, 100)}%`,
              duration: 0.5,
              ease: "power2.out",
            });
          }
          setLevelProgressPercentage(data.level_progress_percentage);
        }
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col p-2 font-bold">
      <span>
        Niveau {level}
        <span ref={plusOneRef} className="ml-2 text-green-500 opacity-0">
          +1
        </span>
      </span>
      <div className="mt-1 h-2.5 w-32 bg-gray-400">
        <div ref={progressBarRef} className="bg-primary-900 h-2.5"></div>
      </div>
    </div>
  );
}
