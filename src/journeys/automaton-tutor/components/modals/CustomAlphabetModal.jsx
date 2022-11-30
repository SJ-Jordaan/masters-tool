import { Portal } from "react-portal";
import useAutomatonTutorStore, {
  Modal,
} from "../../state/useAutomatonTutorStore";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import useGraphStore from "../../state/useGraphSettings";

const alphabetCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

export const CustomAlphabetModal = ({ closeModal }) => {
  const { setAlphabet } = useGraphStore();
  const [parentError] = useAutoAnimate();
  const { activeModal } = useAutomatonTutorStore();
  const [localAlphabet, setLocalAlphabet] = useState("");
  const [error, setError] = useState(null);

  const handleButtonClick = (character) => {
    if (localAlphabet.includes(character)) {
      setLocalAlphabet(localAlphabet.replace(character, ""));
      return;
    }
    if (localAlphabet.length < 4) setLocalAlphabet(localAlphabet + character);
  };

  const handleSetAlphabet = () => {
    setError(null);

    if (localAlphabet.length < 2) {
      setError("Alphabet must contain at least 2 characters.");
      return;
    }

    setAlphabet(localAlphabet);
    closeModal();
  };

  useEffect(() => {
    setError(null);
    setLocalAlphabet("");
  }, [activeModal]);

  return (
    <Portal>
      <div
        className={`modal modal-bottom sm:modal-middle  ${
          activeModal === Modal.CustomAlphabet && "modal-open"
        }`}
      >
        <div className="w-full modal-box">
          <h3 className="text-lg font-bold">Custom Alphabet</h3>
          <p className=" mt-2">
            Select up to four alphabet characters in any order.
          </p>
          <div className="pt-3">
            <div className="flex flex-wrap gap-2">
              {alphabetCharacters.split("").map((character, index) => {
                return (
                  <button
                    key={character + index}
                    onClick={() => handleButtonClick(character)}
                    className={`p-2 w-7 h-7 transition-all grid place-content-center rounded dark:bg-slate-200 ${
                      localAlphabet.includes(character)
                        ? "dark:bg-secondary bg-secondary text-white dark:text-white"
                        : "dark:text-black bg-slate-300 "
                    }`}
                  >
                    {character}
                  </button>
                );
              })}
            </div>
          </div>
          <div ref={parentError} className="mt-4">
            {error && (
              <p className="px-2 py-1 text-sm font-semibold rounded min-w-fit w-fit bg-rose-100 text-error">
                {error}
              </p>
            )}
          </div>
          <div className="flex modal-action gap-x-2">
            <button
              className="rounded btn btn-primary btn-sm lowercase"
              onClick={handleSetAlphabet}
            >
              Set Alphabet
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
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
