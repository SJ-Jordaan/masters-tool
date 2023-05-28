import React from "react";
import { BottomNavbar } from "../../components";
import ProfileView from "../../components/user-profile/ProfileView";

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
      <ProfileView />
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
      <footer className="container mx-auto mt-20 w-full px-2">
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
