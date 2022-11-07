import { Portal } from "react-portal";
import { useState, useEffect, useRef } from "react";
import useAutomatonTutorStore, {
  Modal,
  Context,
} from "../../state/useAutomatonTutorStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useSimulationStore from "../../state/useSimulation";

export const TestInputModal = ({ closeModal }) => {
  const { activeModal, initialStateId, setActiveContexMenu } =
    useAutomatonTutorStore();
  const { setCurrentInput, reset } = useSimulationStore();
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const [parentError] = useAutoAnimate();
  const handleSimulation = () => {
    if (initialStateId === null) {
      setError("Simulation requires an automaton with an initial state.");
      return;
    }

    if (inputRef.current.value === "") {
      setError("Simulation requires an input.");
      return;
    }

    setError(null);

    setCurrentInput(inputRef.current.value);
    reset();
    setActiveContexMenu(Context.Simulation);
    closeModal();
  };

  const handleVerifyInput = () => {
    if (initialStateId === null) {
      setError("Verification requires an automaton with an initial state.");
      return;
    }

    /**
     * TODO: Implement verification
     * */
  };

  useEffect(() => {
    if (initialStateId) setError(null);
  }, [initialStateId]);

  return (
    <Portal>
      <div
        className={`modal modal-bottom sm:modal-middle  ${
          activeModal === Modal.TestInput && "modal-open"
        }`}
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Test Input</h3>
          <div className="py-4">
            <p>Enter consecutive symbols with no delimiters.</p>
            <div>
              <input
                ref={inputRef}
                type="text"
                className="w-full px-2 py-1 mt-2 rounded bg-inherit ring-1 ring-primary/50"
              />
            </div>
          </div>
          <div ref={parentError}>
            {error && (
              <p className="px-2 py-1 text-sm font-semibold rounded bg-rose-100 text-error w-fit">
                {error}
              </p>
            )}
          </div>
          <div className="flex modal-action gap-x-2">
            <button
              onClick={handleVerifyInput}
              className="rounded btn btn-primary btn-sm"
            >
              Verify
            </button>
            <button
              onClick={handleSimulation}
              className="bg-transparent rounded btn btn-sm text-secondary border-secondary"
            >
              Simulate
            </button>
            <button
              onClick={closeModal}
              className="text-black underline bg-transparent border-none rounded btn-sm btn dark:text-white"
            >
              close
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
