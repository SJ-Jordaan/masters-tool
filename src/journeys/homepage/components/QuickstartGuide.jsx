import React from "react";

const QuickstartGuide = ({ steps }) => {
  return (
    <div>
      <h2 className="text-2xl">Sandbox</h2>
      <ol className="mt-4 grid grid-cols-1 gap-4 md:gap-x-20 sm:grid-cols-2 sm:gap-8 xl:gap-28 xl:grid-cols-3">
        {steps.map(({ img, title }, index) => {
          return (
            <li key={img} className="">
              <div className="flex flex-col w-full max-h-96 h-full">
                <h3
                  title={title}
                  className="md:text-base text-sm md:line-clamp-2 flex-grow"
                >
                  <span className="font-bold mr-2">{index + 1}.</span>
                  {title}
                </h3>
                <img
                  src={`${process.env.PUBLIC_URL}/${img}`}
                  alt=""
                  className="object-cover aspect-video mt-2 md:mt-4 rounded-lg ring ring-gray-600 w-full"
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default QuickstartGuide;
