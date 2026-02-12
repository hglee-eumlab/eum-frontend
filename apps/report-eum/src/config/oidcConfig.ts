import type { UserManagerSettings } from "oidc-client-ts";
import { WebStorageStateStore } from "oidc-client-ts";

const backendUrl =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ??
  "http://192.168.0.79:8080";
const frontendUrl =
  (import.meta.env.VITE_FRONTEND_URL as string | undefined) ??
  window.location.origin;

export const oidcConfig: UserManagerSettings = {
  authority: backendUrl,
  client_id: "oidc-client",
  redirect_uri: `${frontendUrl}/login-callback`,
  post_logout_redirect_uri: `${frontendUrl}/logout-callback`,
  response_type: "code",
  scope: "openid profile",
  automaticSilentRenew: false,
  metadata: {
    issuer: backendUrl,
    authorization_endpoint: `${backendUrl}/oauth2/authorize`,
    token_endpoint: `${backendUrl}/oauth2/token`,
    userinfo_endpoint: `${backendUrl}/userinfo`,
    end_session_endpoint: `${backendUrl}/connect/logout`,
    jwks_uri: `${backendUrl}/oauth2/jwks`,
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};
