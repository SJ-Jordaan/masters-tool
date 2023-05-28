import { AutomatonTutor, Homepage, Library, NotFound } from "../../journeys";

import { Colonisers } from "../../journeys/colonisers/Colonisers";
import { RegexCalc } from "../../journeys/regex-calc/RegexCalc";
import ProfileView from "../../components/user-profile/ProfileView";
import LevelSelector from "../../components/level/LevelSelector";
import LevelProgress from "../../components/level/LevelProgress";
import { LibraryItemOverview } from "../../journeys/library/overview/LIbraryItemOverview";

export const AppRoutes = [
  {
    path: "/",
    element: <Homepage />,
    isAuthenticated: false,
    exact: true,
  },
  {
    path: "/tutor",
    element: <AutomatonTutor />,
  },
  {
    path: "/library/:id",
    element: <LibraryItemOverview />,
    isAuthenticated: true,
    exact: true,
  },
  {
    path: "/library",
    element: <Library />,
    isAuthenticated: false,
    exact: true,
  },
  {
    path: "/colonisers",
    element: <Colonisers />,
    isAuthenticated: false,
    exact: true,
  },
  {
    path: "/regex/calculator",
    element: <RegexCalc />,
    isAuthenticated: false,
    exact: true,
  },
  {
    path: "/user/view",
    element: <ProfileView />,
    isAuthenticated: true,
    exact: true,
  },
  {
    path: "/exercise/regex",
    element: <LevelSelector />,
    isAuthenticated: true,
  },
  {
    path: "/level/:levelId",
    element: <LevelProgress />,
    isAuthenticated: true,
  },
  {
    element: <NotFound />,
  },
];
