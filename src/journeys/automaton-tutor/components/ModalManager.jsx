import useAutomatonTutorStore from "../state/useAutomatonTutorStore";
import { TestInputModal, EditStateModal, EditTransitionModal } from "./modals";
const ModalManager = () => {
  const { setActiveModal } = useAutomatonTutorStore();
  const closeModal = () => setActiveModal(null);
  return (
    <>
      <TestInputModal closeModal={closeModal} />
      <EditTransitionModal closeModal={closeModal} />
      <EditStateModal closeModal={closeModal} />
    </>
  );
};

export default ModalManager;
