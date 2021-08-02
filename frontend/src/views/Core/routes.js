import React, { Fragment, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoadingScreen from "src/components/LoadingScreen";
import { ROUTE_PATH } from "src/constants";
import Layout from "src/layouts";

const routeViews = [
  {
    exact: true,
    path: ROUTE_PATH.UNKNOWN,
    component: lazy(() => import("src/views/NotFound")),
  },
  {
    exact: true,
    path: ROUTE_PATH.ROOT,
    component: () => <Redirect to={ROUTE_PATH.DASHBOARD} />,
  },
  {
    exact: true,
    path: ROUTE_PATH.DASHBOARD,
    layout: Layout,
    component: lazy(() => import("src/views/Dashboard")),
  },
  {
    exact: true,
    path: ROUTE_PATH.INVOICE,
    layout: Layout,
    component: lazy(() => import("src/views/Invoice")),
  },
];

const routes = (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routeViews.map((route, i) => {
        const Component = route.component;
        const Layout = route.layout || Fragment;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Layout>
                <Component {...props} />
              </Layout>
            )}
          />
        );
      })}

      <Redirect path="*" to={ROUTE_PATH.UNKNOWN} />
    </Switch>
  </Suspense>
);

export default routes;
