import {
  faAngleRight,
  faArrowLeft,
  faDownload,
  faEye,
  faLocation,
  faMessage,
  faPhone,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { editEmployeeProfile, getEmployeeProfile } from "../apicalls";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CountryStateCity from "../countries+states+cities.json";
import { toast } from "react-toastify";

const EditProfile = () => {
  let navigate = useNavigate();
  const { dispatch, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [employeeProfile, setEmployeeProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    user_type: "EMPLOYEE",
    gender: "",
    country: "",
    state: "",
    city: "",
  });
  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  const { isLoading: profileLoading, data: profile } = useQuery({
    queryKey: ["Profile", token],
    queryFn: getEmployeeProfile,
  });

  useEffect(() => {
    if (profile) {
      setEmployeeProfile({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        date_of_birth: profile.date_of_birth,
        user_type: "EMPLOYEE",
        gender: profile.gender,
        contact_number: profile.contact_number,
        country: "",
        state: "",
        city: "",
      });
    }
  }, [profile]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editEmployeeProfile(token, employeeProfile, setLoading, dispatch, toast);
  };

  if (profileLoading) return <h1>Loading...</h1>;

  return (
    <div className="editProfileContainer">
      <div className="editProfileContent">
        <div className="editProfileHeader">
          <button
            className="backBtn"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <h1>Edit Profile</h1>
        </div>

        <form
          className="editProfileFields"
          onSubmit={(e) => {
            HandleSubmit(e);
          }}
        >
          <div>
            <h4>First Name</h4>
            <input
              placeholder="John"
              type="text"
              required
              className="loginInput"
              value={employeeProfile.first_name}
              onChange={(e) => {
                setEmployeeProfile({
                  ...employeeProfile,
                  first_name: e.target.value,
                });
              }}
            />
          </div>

          <div>
            <h4>Last Name</h4>
            <input
              placeholder="Doe"
              type="text"
              required
              className="loginInput"
              value={employeeProfile.last_name}
              onChange={(e) => {
                setEmployeeProfile({
                  ...employeeProfile,
                  last_name: e.target.value,
                });
              }}
            />
          </div>

          <div>
            <h4>Email</h4>
            <input
              placeholder="abc@gmail.com"
              type="email"
              required
              className="loginInput"
              value={employeeProfile.email}
              onChange={(e) => {
                setEmployeeProfile({
                  ...employeeProfile,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div>
            <h4>Contact Number</h4>
            <input
              placeholder="9876543210"
              type="number"
              required
              className="loginInput"
              onChange={(e) => {
                setEmployeeProfile({
                  ...employeeProfile,
                  contact_number: e.target.value,
                });
              }}
            />
          </div>

          <div>
            <h4>Date Of Birth</h4>
            <input
              placeholder="abc@gmail.com"
              type="date"
              required
              className="loginInput"
              value={employeeProfile.date_of_birth}
              onChange={(e) => {
                setEmployeeProfile({
                  ...employeeProfile,
                  date_of_birth: e.target.value,
                });
              }}
            />
          </div>

          <div>
            <h4>Gender</h4>
            <select
              className="loginInput"
              required
              value={employeeProfile.gender}
              onChange={(e) => {
                setEmployeeProfile({
                  ...employeeProfile,
                  gender: e.target.value,
                });
              }}
            >
              <option disabled selected value="">
                -- select a gender --
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>

          <div>
            <h4>Country</h4>
            <select
              className="loginInput"
              required
              onChange={(e) => {
                setEmployeeProfile({
                  ...employeeProfile,
                  country: e.target.value.substring(
                    0,
                    e.target.value.indexOf("+")
                  ),
                });
                setCountryIndex(
                  e.target.value.substring(e.target.value.indexOf("+") + 1)
                );
              }}
            >
              <option disabled selected value="">
                -- select a country --
              </option>
              {CountryStateCity.map((e, index) => {
                return <option value={`${e.name}+${index}`}>{e.name}</option>;
              })}
            </select>

            {countryIndex ? (
              <select
                className="loginInput"
                onChange={(e) => {
                  setEmployeeProfile({
                    ...employeeProfile,
                    state: e.target.value.substring(
                      0,
                      e.target.value.indexOf("+")
                    ),
                  });
                  setStateIndex(
                    e.target.value.substring(e.target.value.indexOf("+") + 1)
                  );
                }}
              >
                <option disabled selected value="">
                  -- select a state --
                </option>
                {CountryStateCity[countryIndex].states.map((e, index) => {
                  return <option value={`${e.name}+${index}`}>{e.name}</option>;
                })}
              </select>
            ) : null}

            {stateIndex ? (
              <select
                className="loginInput"
                onChange={(e) => {
                  setEmployeeProfile({
                    ...employeeProfile,
                    city: e.target.value,
                  });
                }}
              >
                <option disabled selected value="">
                  -- select a city --
                </option>
                {CountryStateCity[countryIndex].states[stateIndex].cities.map(
                  (e) => {
                    return <option value={e.name}>{e.name}</option>;
                  }
                )}
              </select>
            ) : null}
          </div>

          <button className="loginButton" type="submit">
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
