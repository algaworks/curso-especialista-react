import jwtDecode from "jwt-decode";
import { useEffect, useMemo } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Authentication } from "../auth/Auth";
import AuthService from "../auth/Authorization.service";
import useAuth from "../core/hooks/useAuth";
import info from "../core/utils/info";
import Loading from "./components/Loading";
import EditorProfileView from "./views/EditorProfile.view";
import EditorsListView from "./views/EditorsList.view";
import Home from "./views/Home.view";
import NotFound404 from "./views/NotFound404.view";
import PostCreateView from "./views/PostCreate.view";
import PostEditView from "./views/PostEdit.view";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function App() {
  const history = useHistory();
  const location = useLocation();

  const { user, fetchUser } = useAuth();

  useEffect(() => {
    window.onunhandledrejection = function (error: PromiseRejectionEvent) {
      console.log(error);
      info({
        title: error.reason.response?.data.title || "Erro",
        description: error.reason.response?.data.detail || error.reason.message,
      });
    };
  }, []);

  useEffect(() => {
    async function identify() {
      const isInAuthorizationRoute = window.location.pathname === "/authorize";
      const code = new URLSearchParams(window.location.search).get("code");

      const codeVerifier = AuthService.getCodeVerifier();
      const accessToken = AuthService.getAccessToken();

      if (!accessToken && !isInAuthorizationRoute) {
        AuthService.imperativelySendToLoginScreen();
      }

      if (isInAuthorizationRoute) {
        if (!code) {
          info({
            title: "Erro",
            description: "Código de autorização não informado",
          });
          AuthService.imperativelySendToLoginScreen();
          return;
        }

        if (!codeVerifier) {
          AuthService.imperativelySendToLogout();
          return;
        }

        // busca o primeiro token de acesso
        const {
          access_token,
          refresh_token,
        } = await AuthService.getFirstAccessTokens({
          code,
          codeVerifier,
          redirectUri: `${APP_BASE_URL}/authorize`,
        });

        AuthService.setAccessToken(access_token);
        AuthService.setRefreshToken(refresh_token);

        const decodedToken: Authentication.AccessTokenDecodedBody = jwtDecode(
          access_token
        );
        fetchUser(decodedToken["alganews:user_id"]);
        history.push("/");
      }

      if (accessToken) {
        const decodedToken: Authentication.AccessTokenDecodedBody = jwtDecode(
          accessToken
        );
        fetchUser(decodedToken["alganews:user_id"]);
      }
    }

    identify();
  }, [history, fetchUser]);

  const isAuthorizationRoute = useMemo(
    () => location.pathname === "/authorize",
    [location.pathname]
  );

  if (isAuthorizationRoute || !user) return <Loading show />;

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/editores" exact component={EditorsListView} />
      <Route path="/editores/:id" exact component={EditorProfileView} />
      <Route path="/posts/criar" exact component={PostCreateView} />
      <Route path="/posts/editar/:id" exact component={PostEditView} />
      <Route component={NotFound404} />
    </Switch>
  );
}
