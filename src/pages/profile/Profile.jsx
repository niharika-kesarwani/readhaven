import "./Profile.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const Profile = () => {
  const location = useLocation();

  return (
    <div className="profile_page">
      <ul className="profile_list">
        <li className="profile_list_item">
          <NavLink
            to="/profile"
            className={
              location.pathname === "/profile"
                ? "navlink active_navlink"
                : "navlink"
            }
          >
            <h2>Profile</h2>
          </NavLink>
        </li>
        <li className="profile_list_item">
          <NavLink
            to="/profile/address"
            className={({ isActive }) =>
              isActive ? "navlink active_navlink" : "navlink"
            }
          >
            <h2>Address</h2>
          </NavLink>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
};
