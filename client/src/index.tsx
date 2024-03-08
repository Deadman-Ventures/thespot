import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import { App } from "./App";
import { ErrorPage, Homepage, Itineraries, NewItinerary } from "./Pages"
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import './index.css'
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword, { Github, Google, Facebook, Apple } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { API_ROOT, APP_NAME, WEBSITE_DOMAIN } from './Types/Config'
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui"
import { ExistingItinerary } from "./Pages/Itineraries/ExistingItinerary";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: APP_NAME,
    apiDomain: API_ROOT,
    websiteDomain: WEBSITE_DOMAIN,
    apiBasePath: "/auth",
    websiteBasePath: "/auth"
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
          Facebook.init(),
          Apple.init(),
        ]
      }
    }),
    Session.init()
  ]
});

const routes = getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyEmailPasswordPreBuiltUI])
const router = createBrowserRouter([
  ...routes.map(r => r.props as reactRouterDom.RouteObject),
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: '/itineraries',
        element: <SessionAuth><Itineraries /></SessionAuth>
      },
      {
        path: '/itineraries/new',
        element: <SessionAuth><NewItinerary /></SessionAuth>
      },
      {
        path: '/itineraries/:id',
        element: <SessionAuth><ExistingItinerary /></SessionAuth>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <RouterProvider router={router} />
    </SuperTokensWrapper>
  </React.StrictMode>
);