import {
  Auth0Provider,
  useAuth0,
  withAuthenticationRequired
} from "@auth0/auth0-react";
import Sidebar from "components/Sidebar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Contacts from "views/Contacts";
import DeveloperSettings from "views/DeveloperSettings";
import Home from "views/Home";
import Jobs from "views/Jobs";
import Loading from "views/Loading";
import Login from "views/Login";
import Profile from "views/Profile";
import Settings from "views/Settings";
import Skills from "views/Skills";

interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = (props) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const ProtectedProfile = withAuthenticationRequired(Profile);
  const ProtectedJobs = withAuthenticationRequired(Jobs);
  const ProtectedSkills = withAuthenticationRequired(Skills);
  const ProtectedContacts = withAuthenticationRequired(Contacts);
  const ProtectedSettings = withAuthenticationRequired(Settings);
  const ProtectedDeveloperSettings =
    withAuthenticationRequired(DeveloperSettings);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="flex overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route path="/jobs" element={<ProtectedJobs />} />
          <Route path="/skills" element={<ProtectedSkills />} />
          <Route path="/contacts" element={<ProtectedContacts />} />
          <Route path="/settings" element={<ProtectedSettings />} />
          <Route path="/developer-settings" element={<DeveloperSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
