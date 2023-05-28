import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./common/constants";
import { useServiceWorker } from "./hooks";
import { UserContext } from "./context/UserContext";
import ProfileView from "./components/user-profile/ProfileView";

function App() {
  const { waitingWorker, reloadPage, showReload } = useServiceWorker();
  const { user } = useContext(UserContext);

  function getRoutes() {
    if (!user) {
      return <Route path={"/"} element={<ProfileView />} />;
    }

    return AppRoutes.map((route, i) => (
      <Route
        key={`${route.path}-${i}`}
        path={route.path}
        element={route.element}
        isAuthenticated={route.isAuthenticated}
      />
    ));
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>{getRoutes()}</Routes>

      {showReload && waitingWorker && (
        <div className="fixed top-0 right-0 left-0 w-full bg-white shadow-lg rounded-lg p-4 antialiased">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm leading-5 font-medium text-gray-900">
                A new version is available of the app is available.
              </p>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Click here to update.
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={reloadPage}
                className="inline-flex items-center text-white bg-green-500 border border-transparent rounded-md shadow-sm px-2 py-1 text-sm leading-5 font-medium hover:bg-green-400 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
