import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import AppRouter from "App/AppRouter";
import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions
} from "@auth0/auth0-react";
import { BrowserRouter, useNavigate } from "react-router-dom";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container!);

const Auth0ProviderWithRedirectCallback = ({
  children,
  ...props
}: Auth0ProviderOptions) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

root.render(
  <BrowserRouter>
    <Auth0ProviderWithRedirectCallback
      domain="dev-j3jbfoh6.us.auth0.com"
      clientId="N0FhVfdkCdgFNMV5N1epwRfurdqwW7yL"
      redirectUri={window.location.origin}
    >
      <AppRouter />
    </Auth0ProviderWithRedirectCallback>
  </BrowserRouter>
);
