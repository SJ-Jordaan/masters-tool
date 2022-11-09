import { useEffect, useRef } from "react";
import { Portal } from "react-portal";
import useAutomatonTutorStore, {
  Modal,
  Context,
} from "../../state/useAutomatonTutorStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm, useFieldArray } from "react-hook-form";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export const EditTransitionModal = ({ closeModal }) => {
  const inputRef = useRef();
  const [parent] = useAutoAnimate();
  const [parentError] = useAutoAnimate();
  const {
    toggleMakeTransition,
    addTransition,
    selectedEntity,
    graphData,
    removeTransition,
    setTargetState,
    targetState,
    activeModal,
    setActiveContexMenu,
    setSelectedEntity,
    makeTransition,
  } = useAutomatonTutorStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });
  useEffect(() => {
    remove();
    if (targetState) {
      const values = graphData?.links.filter(
        (link) =>
          link.source.id === selectedEntity?.id &&
          link.target.id === targetState?.id
      )[0]?.values;

      append(values ? values : []);
    }
  }, [append, remove, selectedEntity?.id, targetState, graphData?.links]);

  const handleEditTransition = (data) => {
    const transition = graphData?.links.filter(
      (link) =>
        link.source.id === selectedEntity?.id &&
        link.target.id === targetState?.id
    )[0];

    if (data.values.length === 0 && transition) {
      removeTransition(transition.index);
    } else if (data.values.length > 0) {
      if (transition) removeTransition(transition.index);
      let uniqueValues = [];
      data.values
        .map((val) => val[0])
        .forEach((item) => {
          if (uniqueValues.indexOf(item.trim()) < 0) {
            uniqueValues.push(item.trim());
          }
        });
      const transitionObj = {
        source: selectedEntity.id,
        target: targetState.id,
        values: uniqueValues,
      };
      addTransition(transitionObj);
    }
    toggleMakeTransition();
    setTargetState(null);
    closeModal();
  };

  const removeTransitionValue = (index) => {
    remove(index);
  };

  const addNewValue = (e) => {
    e.preventDefault();
    append({ 0: "" });
  };

  return (
    <Portal>
      <form
        onSubmit={handleSubmit(handleEditTransition)}
        className={`modal modal-bottom sm:modal-middle ${
          activeModal === Modal.EditTransition && "modal-open"
        }`}
        autoComplete="off"
      >
        <div className="modal-box">
          <div className="flex justify-between">
            <h3 className="flex text-lg font-bold">Transition Values</h3>
            <div className="flex items-center gap-x-2">
              <span>{selectedEntity?.name}</span>
              <HiOutlineArrowNarrowRight />
              <span>{targetState?.name}</span>
            </div>
          </div>
          <div className="py-4">
            <ul
              className="flex flex-wrap items-center grid-cols-3 gap-2 sm:grid"
              ref={parent}
            >
              {fields.length === 0 && (
                <p className="px-2 py-1 text-sm font-semibold rounded min-w-fit w-fit bg-info/10 text-info">
                  No values.
                </p>
              )}
              {fields.map((value, index) => {
                return (
                  <li
                    key={value.id}
                    className="flex items-center w-full gap-2 px-2 py-1 mt-2 rounded ring-1 ring-primary/50"
                  >
                    <input
                      className="w-full bg-inherit"
                      ref={inputRef}
                      defaultValue={value["0"]}
                      type="text"
                      {...register(`values.${index}.0`, { required: true })}
                    />
                    <AiOutlineClose
                      className="w-5 h-5"
                      onClick={() => removeTransitionValue(index)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div ref={parentError}>
            {errors.values && (
              <p className="px-2 py-1 text-sm font-semibold rounded min-w-fit w-fit bg-rose-100 text-error">
                Please fill in all the values.
              </p>
            )}
          </div>
          <div className="flex modal-action gap-x-2">
            <button
              className="mr-auto rounded btn btn-sm"
              onClick={addNewValue}
            >
              New Value
            </button>
            <button className="rounded btn btn-primary btn-sm">Save</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedEntity(null);
                setTargetState(null);
                if (makeTransition) toggleMakeTransition();
                setActiveContexMenu(Context.Canvas);
                closeModal();
              }}
              className="text-black underline bg-transparent border-none rounded btn-sm btn dark:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </Portal>
  );
};
