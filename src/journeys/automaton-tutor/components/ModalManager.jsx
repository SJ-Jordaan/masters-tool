import useAutomatonTutorStore from "../state/useAutomatonTutorStore";
import {
  TestInputModal,
  EditStateModal,
  EditTransitionModal,
  SelectAlphabetModal,
  CustomAlphabetModal,
} from "./modals";
const ModalManager = () => {
  const { setActiveModal } = useAutomatonTutorStore();
  const closeModal = () => setActiveModal(null);
  return (
    <>
      <TestInputModal closeModal={closeModal} />
      <EditTransitionModal closeModal={closeModal} />
      <EditStateModal closeModal={closeModal} />
      <SelectAlphabetModal closeModal={closeModal} />
      <CustomAlphabetModal closeModal={closeModal} />
    </>
  );
};

export default ModalManager;
