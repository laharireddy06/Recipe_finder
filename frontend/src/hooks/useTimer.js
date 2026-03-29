import { useEffect, useState } from "react";

export default function useTimer(minutes, resetKey) {
  const [seconds, setSeconds] = useState(minutes * 60);

  // Reset timer when step changes
  useEffect(() => {
    setSeconds(minutes * 60);
  }, [minutes, resetKey]);

  // Countdown logic
  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return {
    min: Math.floor(seconds / 60),
    sec: seconds % 60
  };
}
