import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { signout } from "../apicalls";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="profileContainer">
      <div className="profileContent">
        <div className="profileHeader">
          <div>
            <h1>Risav Sarkar</h1>
            <button className="editBtn">Edit</button>
          </div>
          <button
            className="signOutBtn"
            onClick={() => {
              signout(dispatch);
            }}
          >
            <FontAwesomeIcon icon={faSignOut} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
