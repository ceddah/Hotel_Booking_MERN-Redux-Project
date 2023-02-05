import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { LOGOUT } from "../constants/actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });

    window.localStorage.removeItem("auth");
    history.push(ROUTES.LOGIN);
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to={ROUTES.HOME}>
        Home
      </Link>

      {auth !== null && (
        <Link className="nav-link" to={ROUTES.DASHBOARD}>
          Dashboard
        </Link>
      )}

      {auth !== null && (
        <a onClick={logout} className="nav-link pointer" href="#!">
          Logout
        </a>
      )}

      {auth === null && (
        <>
          <Link className="nav-link" to={ROUTES.LOGIN}>
            Login
          </Link>
          <Link className="nav-link" to={ROUTES.REGISTER}>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
