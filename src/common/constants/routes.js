import { AutomatonTutor, Homepage, Library, NotFound } from '../../journeys';

import { Colonisers } from '../../journeys/colonisers/Colonisers';

export const AppRoutes = [
  {
    path: '/',
    element: <Homepage />,
    isAuthenticated: false,
    exact: true,
  },
  {
    path: '/tutor',
    element: <AutomatonTutor />,
  },
  {
    path: '/library',
    element: <Library />,
    isAuthenticated: false,
    exact: true,
  },
  {
    path: '/colonisers',
    element: <Colonisers />,
    isAuthenticated: false,
    exact: true,
  },
  {
    element: <NotFound />,
  },
];
