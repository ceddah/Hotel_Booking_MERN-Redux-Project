import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResult from "./hotels/SearchResult";

//Components
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";

import * as ROUTES from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer />
      <Switch>
        <Route path={ROUTES.HOME} component={Home} exact />
        <Route path={ROUTES.LOGIN} component={Login} exact />
        <Route path={ROUTES.REGISTER} component={Register} exact />
        <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} exact />
        <PrivateRoute
          path={ROUTES.DASHBOARD_SELLER}
          component={DashboardSeller}
          exact
        />
        <PrivateRoute path={ROUTES.NEW_HOTEL} component={NewHotel} exact />
        <PrivateRoute
          path={ROUTES.STRIPE_CALLBACK}
          component={StripeCallback}
          exact
        />
        <PrivateRoute path={ROUTES.EDIT_HOTEL} component={EditHotel} exact />
        <PrivateRoute path={ROUTES.VIEW_HOTEL} component={ViewHotel} exact />
        <PrivateRoute
          path={ROUTES.STRIPE_SUCCESS}
          component={StripeSuccess}
          exact
        />
        <PrivateRoute
          path={ROUTES.STRIPE_CANCEL}
          component={StripeCancel}
          exact
        />
        <Route path={ROUTES.SEARCH_RESULT} component={SearchResult} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
