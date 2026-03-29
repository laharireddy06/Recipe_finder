import { useState, useEffect } from "react";

export default function CookingMode({ recipe, onExit }) {
  const steps = recipe.instructions;
  const totalSteps = steps.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [seconds, setSeconds] = useState(300); // 5 min timer

  // ⏱ Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col justify-center items-center z-50">
      {/* TOP BAR */}
      <div className="absolute top-4 left-6 text-xl font-bold">
        {recipe.title}
      </div>

      <div className="absolute top-4 right-6">
        <button
          onClick={onExit}
          className="text-red-400 hover:text-red-600"
        >
          Exit
        </button>
      </div>

      {/* STEP INFO */}
      <div className="text-gray-400 mb-2">
        Step {currentStep + 1} of {totalSteps}
      </div>

      {/* STEP TEXT */}
      <div className="text-3xl font-bold text-center max-w-3xl px-6">
        {steps[currentStep]}
      </div>

      {/* TIMER */}
      <div className="text-yellow-400 text-4xl mt-6">
        ⏱ {formatTime(seconds)}
      </div>

      {/* CONTROLS */}
      <div className="flex gap-6 mt-10">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((s) => s - 1)}
          className="px-6 py-2 bg-gray-700 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={currentStep === totalSteps - 1}
          onClick={() => setCurrentStep((s) => s + 1)}
          className="px-6 py-2 bg-green-600 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
