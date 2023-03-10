import React from "react";
import { BottomNavbar } from "../../components";

const steps = [
  {
    title:
      "Click the hamburger menu (3 lines icon) with an purple underline to open the menu.",
    description: "",
    img: "/tutorials/sandbox/step1.png",
  },
  {
    title: "Select/Click on the 'Select Alphabet' option.",
    description: "",
    img: "/tutorials/sandbox/step2.png",
  },
  {
    title:
      "Select the alphabet option you want or alternatively make your custom alphabet(up to four characters/symbols) by clicking 'Custom option'.",
    description: "",
    img: "/tutorials/sandbox/step3.png",
  },
  {
    title:
      "Now click the addition icon with a purple underline in order to make a new state.",
    description: "",
    img: "/tutorials/sandbox/step4.png",
  },
  {
    title:
      "Onces a new state is added, you can now set the state as an initial state, final state or both. But you can only have one initial state and many final states",
    description: "",
    img: "/tutorials/sandbox/step5.png",
  },
  {
    title:
      "Once you have at least two states you now link them to one another by clicking the icon(chain link) with the purple underline. Note that you can also link a state to itself by selecting the same state as the target state when you are prompted to select a target state.",
    description: "",
    img: "/tutorials/sandbox/step6.png",
  },
  {
    title:
      "When you have selected your target state a modal should appear for you to set values for the link/transition you have just created.",
    description: "",
    img: "/tutorials/sandbox/step7.png",
  },
];

export const Homepage = () => {
  return (
    <div className="flex flex-col mb-60">
      {/* <div className="bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">
                        CSTutor - Quickstart Guide
                    </h1>
                </div>
            </header>
            <main className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
                <h2 className="text-2xl mx-4 font-bold leading-tight text-gray-900">
                    Sandbox
                </h2>
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    User defined alphabet
                                </h3>
                                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                                    <ol className="list-decimal list-inside flex flex-col">
                                        <li>Tap on the burger menu (3 lines icon)</li>
                                        <img className="my-2 self-center" src={Images.Tutorials.Sandbox.SelectAlphabet["1"]} alt={"Select burger menu"}/>
                                        <li>Tap on "Select Alphabet"</li>
                                        <img className="my-2 self-center" src={Images.Tutorials.Sandbox.SelectAlphabet["2"]} alt={"Select alphabet"}/>
                                        <li>Choose a pre-defined alphabet or create your own!</li>
                                        <img className="my-2 self-center" src={Images.Tutorials.Sandbox.SelectAlphabet["3"]} alt={"Choose alphabet"}/>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Freely build a DFA
                                </h3>
                                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                                    <ol className="list-decimal list-inside flex flex-col">
                                        <li>Add your first state</li>
                                        <img className="my-2 self-center" src={Images.Tutorials.Sandbox.States["1"]} alt={"Add state"}/>
                                        <li>Tap on your new state to select it</li>
                                        <div className="flex flex-row self-center">
                                            <img className="my-2 self-start" src={Images.Tutorials.Sandbox.States["2"]} alt={"Unselected state"}/>
                                            <AiOutlineArrowRight size={24} className="mx-2 self-center"/>
                                            <img className="my-2 self-end" src={Images.Tutorials.Sandbox.States["3"]} alt={"Highlighted state"}/>
                                        </div>
                                        <li>Notice how the context menu changed when a state is focused</li>
                                        <img className="my-2 self-center" src={Images.Tutorials.Sandbox.States["4"]} alt={"Context menu"}/>
                                        <li>From left to right they are:</li>
                                        <ol className="list-disc list-inside">
                                            <li>Add transition</li>
                                            <li>Make initial</li>
                                            <li>Make final</li>
                                            <li>Rename</li>
                                            <li>Delete</li>
                                        </ol>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div> */}
      <header>
        <div className="container  mx-auto pt-6 px-2">
          <h1 className="text-4xl tracking-wide text-center md:text-left">
            CSTutor <span className="hidden md:inline">-</span>
            Quickstart Guide
          </h1>
          <p className=" mt-3 tracking text-center md:text-left">
            A quick guide on how to navigate the automaton tutor, just follow
            the easy steps below in order to make an automaton.
          </p>
        </div>
      </header>
      <main className=" container mx-auto mt-8  px-2">
        <div>
          <h2 className=" text-2xl">Sandbox</h2>
          <ol className=" mt-4 grid grid-cols-1 gap-4 md:gap-x-20 sm:grid-cols-2 sm:gap-8 xl:gap-28 xl:grid-cols-3">
            {steps.map(({ img, title }, index) => {
              return (
                <li key={img} className="">
                  <div className=" flex flex-col w-full max-h-96 h-full">
                    <h3
                      title={title}
                      className=" md:text-base text-sm md:line-clamp-2 flex-grow "
                    >
                      <span className="font-bold mr-2">{index + 1}.</span>
                      {title}
                    </h3>
                    <img
                      src={`${process.env.PUBLIC_URL}/${img}`}
                      alt=""
                      className=" object-cover aspect-video mt-2 md:mt-4 rounded-lg ring ring-gray-600 w-full"
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
      <footer className="container mx-auto mt-20 w-full ">
        <div>
          <a href="/masters-tool/tutor" className=" btn btn-primary">
            Get Started Now
          </a>
        </div>
      </footer>
      <BottomNavbar />
    </div>
  );
};
