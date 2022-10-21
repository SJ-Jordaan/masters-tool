import { useEffect, useRef } from "react";
import { Portal } from "react-portal";
import useAutomatonTutorStore from "../../state/useAutomatonTutorStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm, useFieldArray } from "react-hook-form";

const NameTransitionModal = () => {
  const inputRef = useRef();
  const [parent] = useAutoAnimate();
  const {
    toggleMakeTransition,
    addTransition,
    selectedEntity,
    graphData,
    removeTransition,
    setTargetState,
    targetState,
  } = useAutomatonTutorStore();
  const { register, control, handleSubmit } = useForm();
  const closeButtonRef = useRef();
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
  }, [append, graphData?.links, remove, selectedEntity?.id, targetState]);

  const handleEditTransition = (data) => {
    const transition = graphData?.links.filter(
      (link) =>
        link.source.id === selectedEntity?.id &&
        link.target.id === targetState?.id
    )[0];

    if (data.values.length === 0) {
      removeTransition(transition.index);
    } else {
      if (transition) removeTransition(transition.index);
      const transitionObj = {
        source: selectedEntity.id,
        target: targetState.id,
        values: data.values.map((val) => val[0]),
      };
      addTransition(transitionObj);
    }
    toggleMakeTransition();
    setTargetState(null);
    closeButtonRef.current.click();
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
      <input
        type="checkbox"
        id="nameTransitionModal"
        className="modal-toggle"
      />
      <form
        onSubmit={handleSubmit(handleEditTransition)}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Transition Values</h3>
          <div className="py-4">
            <ul className="flex flex-wrap items-center gap-2" ref={parent}>
              {fields.map((value, index) => {
                return (
                  <li
                    key={value.id}
                    className="flex items-center gap-2 p-2 mt-2 rounded ring-1 ring-primary/50"
                  >
                    <input
                      ref={inputRef}
                      defaultValue={value["0"]}
                      type="text"
                      {...register(`values.${index}.0`)}
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
          <div className="flex modal-action gap-x-2">
            <button className="mr-auto btn" onClick={addNewValue}>
              New Value
            </button>
            <button className="btn btn-primary">Save</button>
            <label
              ref={closeButtonRef}
              htmlFor="nameTransitionModal"
              className="text-black underline bg-transparent border-none btn dark:text-white"
            >
              Close
            </label>
          </div>
        </div>
      </form>
    </Portal>
  );
};

export default NameTransitionModal;
