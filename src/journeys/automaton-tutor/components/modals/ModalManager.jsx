import TestInputModal from "./TestInputModal";
import EditTransitionModal from "./EditTransitionModal";
import useAutomatonTutorStore from "../../state/useAutomatonTutorStore";
import EditStateModal from "./EditStateModal";

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
