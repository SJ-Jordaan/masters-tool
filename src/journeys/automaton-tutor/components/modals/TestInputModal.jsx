import { Portal } from "react-portal";
import useAutomatonTutorStore, {
  Modal,
} from "../../state/useAutomatonTutorStore";

const TestInputModal = ({ closeModal }) => {
  const { activeModal } = useAutomatonTutorStore();
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
                type="text"
                className="w-full p-2 mt-2 rounded ring-1 ring-primary/50"
              />
            </div>
          </div>
          <div className="flex modal-action gap-x-2">
            <button className=" btn btn-primary">Verify</button>
            <button className="bg-transparent btn text-secondary border-secondary">
              Simulate
            </button>
            <button
              onClick={closeModal}
              className="text-black underline bg-transparent border-none btn dark:text-white"
            >
              close
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TestInputModal;
