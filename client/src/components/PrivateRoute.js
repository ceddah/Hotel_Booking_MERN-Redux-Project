import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN } from "../constants/routes";

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token ? <Route {...rest} /> : <Redirect to={LOGIN} />;
};

export default PrivateRoute;
