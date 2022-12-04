import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import NavbarBtn from "./navbarBtn";

const Navbar = () => {
  const { token, type } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="navbarContainer">
      <div className="navbarContent">
        <Link to="/">
          <h1>ATS</h1>
        </Link>

        {token ? (
          <Link to="/dashboard">
            <button
              className={`jobButton ${
                location.pathname.includes("dashboard") ? "selected" : ""
              }`}
            >
              <h4>Dashboard</h4>
            </button>
          </Link>
        ) : null}
      </div>

      <div className="navbarContent">
        {token ? (
          <>
            <button className="navbarBtn">
              <FontAwesomeIcon icon={faBell} />
            </button>

            <Link to="/profile">
              <button
                className={`navbarBtn ${
                  location.pathname.includes("profile") ? "selected" : ""
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>
          </>
        ) : (
          <>
            <NavbarBtn name={"Sign In"} route={"/signin"} />
            <div className="verticalBar"></div>
            <NavbarBtn name={"Register"} route={"/register"} />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
