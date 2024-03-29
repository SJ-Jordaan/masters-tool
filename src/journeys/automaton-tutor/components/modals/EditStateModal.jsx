import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Portal } from "react-portal";
import useAutomatonTutorStore, {
  Modal,
} from "../../state/useAutomatonTutorStore";

export const EditStateModal = ({ closeModal }) => {
  const { activeModal, selectedEntity } = useAutomatonTutorStore();
  const [parent] = useAutoAnimate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleStateRename = (data) => {
    const state = selectedEntity;
    state.name = data.name;
    closeModal();
  };

  useEffect(() => {
    reset();
  }, [activeModal, reset]);

  return (
    <Portal>
      <form
        onSubmit={handleSubmit(handleStateRename)}
        className={`modal modal-bottom sm:modal-middle  ${
          activeModal === Modal.EditState && "modal-open"
        }`}
        autoComplete="off"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Rename {selectedEntity?.name}</h3>
          <div className="py-4">
            <div>
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full px-2 py-1 mt-2 rounded bg-inherit ring-1 ring-primary/50"
              />
            </div>
          </div>
          <div ref={parent}>
            {errors.name && (
              <p className="px-2 py-1 text-sm font-semibold rounded bg-rose-100 text-rose-700 w-fit">
                Please fill in the value.
              </p>
            )}
          </div>
          <div className="flex modal-action gap-x-2">
            <button className="rounded btn btn-primary btn-sm lowercase">Save</button>
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
      </form>
    </Portal>
  );
};
