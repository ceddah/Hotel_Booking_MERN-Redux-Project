import { Link } from "react-router-dom";
import { DASHBOARD, DASHBOARD_SELLER } from "../constants/routes";

const DashboardNav = () => {
  const active = window.location.pathname;
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === DASHBOARD && "active"}`}
          to={DASHBOARD}
        >
          Your Bookings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === DASHBOARD_SELLER && "active"}`}
          to={DASHBOARD_SELLER}
        >
          Your Hotels
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
