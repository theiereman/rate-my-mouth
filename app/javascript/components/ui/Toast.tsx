import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info" | "warning";
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  type = "error",
  duration = 5000,
  onClose,
}: ToastProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .set(contentRef.current, { opacity: 0 })
      .set(backgroundRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      })
      .set(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      })
      .to(backgroundRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        contentRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.1",
      )
      .to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: duration / 1000,
          ease: "none",
        },
        "-=0.1",
      );

    const timer = setTimeout(() => {
      startCloseAnimation();
    }, duration);

    return () => {
      clearTimeout(timer);
      timeline.kill();
    };
  }, [duration]);

  const startCloseAnimation = () => {
    progressBarRef.current?.style.setProperty("opacity", "0");
    const timeline = gsap.timeline();

    timeline
      .to(progressBarRef.current, {
        scaleY: 0,
        transformOrigin: "center top",
        duration: 0.1,
        ease: "power2.in",
      })
      .to(contentRef.current, {
        opacity: 0,
        duration: 0.2,
      })
      .to(backgroundRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.3,
        ease: "power2.in",
      })
      .call(() => onClose());
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <span className="material-symbols-outlined">priority_high</span>;
      case "success":
        return <span className="material-symbols-outlined">check</span>;
      case "info":
        return <span className="material-symbols-outlined">info</span>;
      case "warning":
        return <span className="material-symbols-outlined">warning</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full items-center p-4">
      <div ref={backgroundRef} className="bg-primary-900 absolute inset-0" />
      <div
        ref={contentRef}
        className="relative flex w-full items-center font-bold text-white"
        role="alert"
      >
        {getIcon()}
        <div className="line-clamp-1 flex-1 text-center">{message}</div>
        <button
          type="button"
          className="flex items-center"
          onClick={startCloseAnimation}
        >
          <span className="sr-only">Fermer</span>
          <span className="material-symbols-outlined cursor-pointer text-white">
            close
          </span>
        </button>
      </div>
      <div
        ref={progressBarRef}
        className="bg-primary-700 absolute bottom-0 left-0 h-1 w-full"
      />
    </div>
  );
}
