import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BottomNavbar } from '../../components';
import {Images} from "../../common/constants";

export const Homepage = () => {
  return (
    <div className='flex flex-col h-screen'>
        <div className="bg-gray-100">
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
        </div>
      <BottomNavbar />
    </div>
  );
};
