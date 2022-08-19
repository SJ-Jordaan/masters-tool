import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { TbResize } from "react-icons/tb";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { CgRename } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
import { BsArrowRight, BsArrowLeftRight } from "react-icons/bs";

export const CanvasContext = () => (
  <>
    <button>
      <AiOutlinePlus className="w-6 h-6 md:w-7 md:h-7" />
    </button>
    <button>
      <HiOutlineColorSwatch className="w-6 h-6 md:w-7 md:h-7" />
    </button>
    <button>
      <TbResize className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  </>
);

export const StateContext = () => (
  <>
    <button>
      <BsArrowRight className="w-6 h-6 md:w-7 md:h-7" />
    </button>
    <button>
      <FiCheckCircle className="w-6 h-6 md:w-7 md:h-7" />
    </button>
    <button>
      <BsArrowLeftRight className="w-6 h-6 md:w-7 md:h-7" />
    </button>
    <button>
      <CgRename className="w-6 h-6 md:w-7 md:h-7" />
    </button>
    <button>
      <AiOutlineDelete className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  </>
);

export const TransitionContext = () => (
  <>
    <button>
      <AiOutlineDelete className="w-6 h-6 md:w-7 md:h-7" />
    </button>
    <button>
      <CgRename className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  </>
);
