import { Portal } from "react-portal";
import { useState, useEffect, useRef } from "react";
import useAutomatonTutorStore, {
  Modal,
  Context,
} from "../../state/useAutomatonTutorStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useSimulationStore from "../../state/useSimulation";
import { BsCheckCircle } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";

let Fragment = require("finite-automata");

const TestInputResult = {
  Accepted: "accepted",
  Rejected: "rejected",
  None: "none",
};

export const TestInputModal = ({ closeModal }) => {
  const {
    activeModal,
    initialStateId,
    setActiveContexMenu,
    graphData,
    finalStateIds,
  } = useAutomatonTutorStore();
  const { setCurrentInput, reset } = useSimulationStore();
  const [error, setError] = useState(null);
  const [isInputAccepted, setIsInputAccepted] = useState(
    TestInputResult.Accepted
  );
  const inputRef = useRef();
  const [parentError] = useAutoAnimate();
  const [isAcceptingAnimationRef] = useAutoAnimate();
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
    const transitions = convertAutomatonToCorrectFormat();

    try {
      const automaton = new Fragment({
        initial: initialStateId,
        accept: finalStateIds,
        transitions: transitions,
      });

      const result = automaton.test(inputRef.current.value);
      setIsInputAccepted(
        result ? TestInputResult.Accepted : TestInputResult.Rejected
      );
    } catch (error) {
      setError(`${error.message}.`);
    }
  };

  /**
   * This function converts the automaton to the correct format for the finite-automata library.
   *
   * transitions[state] - {array} An array where even indices are characters and odd indices are states e.g. key: ['c', 'q0', 'd', 'q0', '\0', 'q2']
   */
  const convertAutomatonToCorrectFormat = () => {
    const states = graphData.nodes.map((node) => node.id);
    const transitions = states.reduce((acc, state) => {
      const finalValues = [];
      graphData.links
        .filter((link) => link.source.id === state)
        .forEach(({ values, target }) => {
          values.forEach((val) => {
            finalValues.push(val);
            finalValues.push(target.id);
          });
        });
      return { ...acc, [state]: finalValues };
    }, {});
    return transitions;
  };

  useEffect(() => {
    if (initialStateId) setError(null);
  }, [initialStateId]);

  useEffect(() => {
    setIsInputAccepted(TestInputResult.None);
  }, [activeModal]);

  return (
    <Portal>
      <div
        className={`modal modal-bottom sm:modal-middle  ${
          activeModal === Modal.TestInput && "modal-open"
        }`}
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Test Input</h3>
          <div className="py-2">
            <p>Enter consecutive symbols with no delimiters.</p>
            <div
              className={`relative ring-1 ring-primary/30 ${
                isInputAccepted === TestInputResult.Accepted &&
                "ring-success/30"
              } ${
                isInputAccepted === TestInputResult.Rejected && "ring-error/30"
              } flex mt-2 rounded overflow-hidden`}
            >
              <input
                onChange={() => {
                  setIsInputAccepted(TestInputResult.None);
                }}
                ref={inputRef}
                type="text"
                className="w-full px-2 py-1 bg-inherit"
              />
              <div ref={isAcceptingAnimationRef}>
                {isInputAccepted === TestInputResult.Rejected && (
                  <div className="px-2 py-1 right-0 top-0 text-sm font-semibold rounded-r bg-error/10 text-error w-fit h-full flex items-center gap-2 min-w-fit">
                    <BiErrorCircle className="w-4 h-4" />
                    <p>Rejected</p>
                  </div>
                )}
                {isInputAccepted === TestInputResult.Accepted && (
                  <div className="px-2 py-1 right-0 top-0 text-sm font-semibold rounded-r bg-success/10 text-success w-fit h-full flex items-center gap-2 min-w-fit">
                    <BsCheckCircle className="w-4 h-4" />
                    <p>Accepted</p>
                  </div>
                )}
              </div>
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
              className="rounded btn btn-primary btn-sm lowercase"
            >
              Verify
            </button>
            <button
              onClick={handleSimulation}
              className="bg-transparent rounded dark:text-white text-black btn btn-sm border dark:border-white lowercase"
            >
              Simulate
            </button>
            <button
              onClick={closeModal}
              className="text-black underline bg-transparent border-none rounded btn-sm btn dark:text-white lowercase"
            >
              close
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
