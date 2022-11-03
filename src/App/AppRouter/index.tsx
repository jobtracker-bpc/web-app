import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Contacts from "views/Contacts";
import DeveloperSettings from "views/DeveloperSettings";

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
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="flex h-screen w-full flex-col bg-[#edf2f4]">
        <Header />
        <div className="flex overflow-y-auto">
          <Routes>
            <Route path="/" element={<ProtectedJobs />} />
            <Route path="/profile" element={<ProtectedProfile />} />
            <Route path="/jobs" element={<ProtectedJobs />} />
            <Route path="/skills" element={<ProtectedSkills />} />
            <Route path="/contacts" element={<ProtectedContacts />} />
            <Route path="/settings" element={<ProtectedSettings />} />
            <Route
              path="/developer-settings"
              element={<ProtectedDeveloperSettings />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRouter;
