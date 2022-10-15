import {
  Auth0Provider,
  useAuth0,
  withAuthenticationRequired
} from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "views/Home";
import Loading from "views/Loading";
import Login from "views/Login";
import Profile from "views/Profile";

interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = (props) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const ProtectedProfile = withAuthenticationRequired(Profile);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProtectedProfile />} />
    </Routes>
  );
};

export default AppRouter;
