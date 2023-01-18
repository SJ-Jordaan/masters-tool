import { Portal } from "react-portal";
import useAutomatonTutorStore, {
  Modal,
} from "../../state/useAutomatonTutorStore";
import { AiOutlineCheckCircle } from "react-icons/ai";
import useGraphStore from "../../state/useGraphSettings";

const defaultAlphabets = ["01", "ab", "xy"];

export const SelectAlphabetModal = ({ closeModal }) => {
  const { alphabet, setAlphabet } = useGraphStore();
  const { activeModal, setActiveModal } = useAutomatonTutorStore();
  return (
    <Portal>
      <div
        className={`modal modal-bottom sm:modal-middle ${
          activeModal === Modal.SelectAlphabet && "modal-open"
        }`}
      >
        <div className="w-full  modal-box">
          <h3 className="text-lg font-bold">Select Alphabet</h3>
          <div className="py-4">
            <fieldset className="flex flex-wrap gap-4">
              {defaultAlphabets.map((alphbt, index) => {
                return (
                  <div
                    className="flex flex-1 items-center justify-between w-24 p-2 text-white bg-slate-500 rounded dark:bg-slate-200 dark:text-black"
                    key={alphbt + index}
                  >
                    <div className="relative w-full">
                      <input
                        onClick={() => setAlphabet(alphbt)}
                        className="absolute w-full h-full appearance-none cursor-pointer"
                        type="radio"
                        defaultChecked={index === 0}
                        name="alphabet"
                        id={alphbt.toString()}
                      />
                      <label
                        htmlFor={alphbt}
                        className="font-bold flex gap-x-2"
                      >
                        {alphbt.split(",").map((item) => {
                          return <span key={item}>{item}</span>;
                        })}
                      </label>
                    </div>
                    {alphabet === alphbt && (
                      <AiOutlineCheckCircle className="w-6 h-6 min-w-max min-h-max text-success" />
                    )}
                  </div>
                );
              })}
              <button
                className="rounded btn dark:bg-white dark:text-black"
                onClick={() => setActiveModal(Modal.CustomAlphabet)}
              >
                Custom
              </button>
            </fieldset>
          </div>
          <div className="flex modal-action gap-x-2">
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
