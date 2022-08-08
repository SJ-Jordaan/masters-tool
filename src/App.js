import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './common/constants';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        {AppRoutes.map((route, i) => (
          <Route
            key={`${route.path}-${i}`}
            path={route.path}
            element={route.element}
            isAuthenticated={route.isAuthenticated}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
