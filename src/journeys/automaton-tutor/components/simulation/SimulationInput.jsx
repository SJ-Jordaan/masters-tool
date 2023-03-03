import useSimulationStore from "../../state/useSimulation";
import { BsCheckCircle } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SimulationInput = () => {
  const { currentInput, currentCharIndex, isAccepting, isDoneSimulating } =
    useSimulationStore();
  const [acceptanceParentRef] = useAutoAnimate();
  const [itemsRef] = useAutoAnimate();
  return (
    <div className="bottom-0 justify-center">
      <div
        className={`flex w-screen  overflow-x-auto mb-2 overflow-hidden snap-x snap-mandatory snap-en border-2 divide-x-2 rounded border-black/60 dark:border-white/60 divide-black/60 dark:divide-white/60 ${
          isDoneSimulating &&
          isAccepting &&
          "border-success dark:border-success divide-success dark:divide-success"
        }
          ${
            isDoneSimulating &&
            !isAccepting &&
            "border-error dark:border-error dark:divide-error divide-error"
          }`}
        ref={itemsRef}
      >
        {currentInput?.split("").map((char, idx) => {
          return (
            <span
              className={`px-4 font-bold flex items-center transition-all ${
                currentCharIndex === idx && "bg-primary text-white"
              }`}
              key={idx}
            >
              {char}
            </span>
          );
        })}
        {isDoneSimulating && (
          <span
            className="flex items-center px-4 py-1"
            ref={acceptanceParentRef}
          >
            {isAccepting ? (
              <BsCheckCircle
                data-tip="Accepted"
                className="w-4 h-4 text-success"
              />
            ) : (
              <BiErrorCircle
                data-tip="Rejected"
                className="w-4 h-4 text-error"
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default SimulationInput;
