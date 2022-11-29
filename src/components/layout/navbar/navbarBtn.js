import { Link } from "react-router-dom";

const NavbarBtn = ({ name, route, isSelected }) => {
  return (
    <Link to={route}>
      <button className={`navbarBtn ${isSelected ? "selected" : ""}`}>
        <p>{name}</p>
      </button>
    </Link>
  );
};

export default NavbarBtn;
