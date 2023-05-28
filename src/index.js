import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { LevelProvider } from "./context/LevelContext";
import { QuestionProvider } from "./context/QuestionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="py-12 p-6 bg-white rounded-t-md">
          <div className="text-center">
            <h1 className="text-2xl text-gray-700 font-semibold mb-3">
              Oops! Something went wrong.
            </h1>
            <h2 className="text-xl text-gray-600">Error Details:</h2>
            <div className="mt-2 p-2 bg-red-50 text-red-600 border border-red-200 rounded overflow-auto max-h-32">
              <pre className="whitespace-pre-wrap">{error.message}</pre>
            </div>
          </div>
        </div>
        <div className="py-3 bg-gray-50 rounded-b-md text-center">
          <button
            onClick={resetErrorBoundary}
            className="w-2/3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

root.render(
  <ErrorBoundary fallbackRender={ErrorFallback}>
    <UserProvider>
      <LevelProvider>
        <QuestionProvider>
          <App />
        </QuestionProvider>
      </LevelProvider>
    </UserProvider>
  </ErrorBoundary>
);
