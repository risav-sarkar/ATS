import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { employeeLogin, employeeRegister } from "../apicalls";
import { AuthContext } from "../context/AuthContext";
import CountryStateCity from "../countries+states+cities.json";

const Auth = ({ type }) => {
  const { dispatch, isFetching } = useContext(AuthContext);
  let navigate = useNavigate();

  const [userType, setUserType] = useState(null);
  const [candidateRegisterFields, setCandidateRegisterFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    user_type: "EMPLOYEE",
    gender: "",
    country: "",
    state: "",
    city: "",
    password: "",
    password2: "",
  });
  const [candidateSigninFields, setCandidateSigninFields] = useState({
    username: "",
    password: "",
  });
  const [employerRegisterFields, setEmployerRegisterFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    user_type: "EMPLOYER",
    gender: "",
    country: "",
    state: "",
    city: "",
    password: "",
    password2: "",
  });
  const [employerSigninFields, setEmployerSigninFields] = useState({
    username: "",
    password: "",
  });
  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  useEffect(() => {
    setUserType(null);
  }, [type]);

  useEffect(() => {
    setCountryIndex(null);
    setStateIndex(null);
  }, [userType, type]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Register" && userType === 1) {
      const res = await employeeRegister(
        candidateRegisterFields,
        dispatch,
        toast
      );
      navigate("/");
    } else if (type === "Register" && userType === 2)
      console.log("Employer Registration Submit");
    else if (type === "Signin" && userType === 1) {
      const res = await employeeLogin(candidateSigninFields, dispatch, toast);
      navigate("/");
    } else console.log("Employer Signin Submit");
  };

  return (
    <div className="authContainer">
      <div className="authContent shadow">
        <h3>Ready to take the next step?</h3>
        <p className="ptag1">
          {type === "Signin"
            ? `Sign in to your account.`
            : `Create an account.`}
        </p>

        <p className="ptag2">
          By creating an account or logging in, you understand and agree to
          ATS's Terms. You also acknowledge our Cookie and Privacy policies. You
          will receive marketing messages from ATS and may opt out at any time
          by following the unsubscribe link in our messages, or as detailed in
          our terms.
        </p>

        {!userType ? (
          <div>
            <h4>Select Type</h4>
            <div className="typeContent">
              <button
                className="typeBtn"
                onClick={() => {
                  setUserType(1);
                }}
              >
                Candidate
              </button>
              <button
                className="typeBtn"
                onClick={() => {
                  setUserType(2);
                }}
              >
                Employer
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="backContainer">
              <button
                className="backBtn"
                onClick={() => {
                  setUserType(null);
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />

                <h3>{userType === 1 ? "Candidate" : "Employer"}</h3>
              </button>
            </div>

            <div className="authBtnsContainer">
              <button className="authBtns">
                <div className="iconContainer">
                  <FontAwesomeIcon icon={faGoogle} />
                </div>
                <h3>Google</h3>
              </button>
            </div>

            <div className="seperator">
              <div className="seperatorLine"></div>
              <p>or</p>
              <div className="seperatorLine"></div>
            </div>

            <form
              className="loginBox"
              onSubmit={(e) => {
                HandleSubmit(e);
              }}
            >
              {type === "Register" && userType === 1 ? (
                <>
                  <div>
                    <h4>First Name</h4>
                    <input
                      placeholder="John"
                      type="text"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
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
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
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
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <h4>Password</h4>
                    <input
                      placeholder="******"
                      type="password"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <h4>Confirm Password</h4>
                    <input
                      placeholder="******"
                      type="password"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
                          password2: e.target.value,
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
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
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
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
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
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
                          country: e.target.value.substring(
                            0,
                            e.target.value.indexOf("+")
                          ),
                        });
                        setCountryIndex(
                          e.target.value.substring(
                            e.target.value.indexOf("+") + 1
                          )
                        );
                      }}
                    >
                      <option disabled selected value="">
                        -- select a country --
                      </option>
                      {CountryStateCity.map((e, index) => {
                        return (
                          <option value={`${e.name}+${index}`}>{e.name}</option>
                        );
                      })}
                    </select>

                    {countryIndex ? (
                      <select
                        className="loginInput"
                        required
                        onChange={(e) => {
                          setCandidateRegisterFields({
                            ...candidateRegisterFields,
                            state: e.target.value.substring(
                              0,
                              e.target.value.indexOf("+")
                            ),
                          });
                          setStateIndex(
                            e.target.value.substring(
                              e.target.value.indexOf("+") + 1
                            )
                          );
                        }}
                      >
                        <option disabled selected value="">
                          -- select a state --
                        </option>
                        {CountryStateCity[countryIndex].states.map(
                          (e, index) => {
                            return (
                              <option value={`${e.name}+${index}`}>
                                {e.name}
                              </option>
                            );
                          }
                        )}
                      </select>
                    ) : null}

                    {stateIndex ? (
                      <select
                        className="loginInput"
                        required
                        onChange={(e) => {
                          setCandidateRegisterFields({
                            ...candidateRegisterFields,
                            city: e.target.value,
                          });
                        }}
                      >
                        <option disabled selected value="">
                          -- select a city --
                        </option>
                        {CountryStateCity[countryIndex].states[
                          stateIndex
                        ].cities.map((e) => {
                          return <option value={e.name}>{e.name}</option>;
                        })}
                      </select>
                    ) : null}
                  </div>
                </>
              ) : type === "Register" && userType === 2 ? (
                <>
                  <div>
                    <h4>First Name</h4>
                    <input
                      placeholder="John"
                      type="text"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setEmployerRegisterFields({
                          ...employerRegisterFields,
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
                      onChange={(e) => {
                        setEmployerRegisterFields({
                          ...employerRegisterFields,
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
                      onChange={(e) => {
                        setEmployerRegisterFields({
                          ...employerRegisterFields,
                          first_name: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <h4>Password</h4>
                    <input
                      placeholder="******"
                      type="password"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setEmployerRegisterFields({
                          ...employerRegisterFields,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <h4>Confirm Password</h4>
                    <input
                      placeholder="******"
                      type="password"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setEmployerRegisterFields({
                          ...employerRegisterFields,
                          password2: e.target.value,
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
                      onChange={(e) => {
                        setEmployerRegisterFields({
                          ...employerRegisterFields,
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
                      onChange={(e) => {
                        setEmployerRegisterFields({
                          ...employerRegisterFields,
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
                        setEmployerRegisterFields({
                          ...employerRegisterFields,
                          country: e.target.value.substring(
                            0,
                            e.target.value.indexOf("+")
                          ),
                        });
                        setCountryIndex(
                          e.target.value.substring(
                            e.target.value.indexOf("+") + 1
                          )
                        );
                      }}
                    >
                      <option disabled selected value="">
                        -- select a country --
                      </option>
                      {CountryStateCity.map((e, index) => {
                        return (
                          <option value={`${e.name}+${index}`}>{e.name}</option>
                        );
                      })}
                    </select>

                    {countryIndex ? (
                      <select
                        className="loginInput"
                        required
                        onChange={(e) => {
                          setEmployerRegisterFields({
                            ...employerRegisterFields,
                            state: e.target.value.substring(
                              0,
                              e.target.value.indexOf("+")
                            ),
                          });
                          setStateIndex(
                            e.target.value.substring(
                              e.target.value.indexOf("+") + 1
                            )
                          );
                        }}
                      >
                        <option disabled selected value="">
                          -- select a state --
                        </option>
                        {CountryStateCity[countryIndex].states.map(
                          (e, index) => {
                            return (
                              <option value={`${e.name}+${index}`}>
                                {e.name}
                              </option>
                            );
                          }
                        )}
                      </select>
                    ) : null}

                    {stateIndex ? (
                      <select
                        className="loginInput"
                        required
                        onChange={(e) => {
                          setEmployerRegisterFields({
                            ...employerRegisterFields,
                            city: e.target.value,
                          });
                        }}
                      >
                        <option disabled selected value="">
                          -- select a city --
                        </option>
                        {CountryStateCity[countryIndex].states[
                          stateIndex
                        ].cities.map((e) => {
                          return <option value={e.name}>{e.name}</option>;
                        })}
                      </select>
                    ) : null}
                  </div>
                </>
              ) : type === "Signin" && userType === 1 ? (
                <>
                  <div>
                    <h4>User Name</h4>
                    <input
                      placeholder="abc@gmail.com"
                      type="email"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setCandidateSigninFields({
                          ...candidateSigninFields,
                          username: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <h4>Password</h4>
                    <input
                      placeholder="******"
                      type="password"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setCandidateSigninFields({
                          ...candidateSigninFields,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4>User Name</h4>
                    <input
                      placeholder="abc@gmail.com"
                      type="email"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setEmployerSigninFields({
                          ...employerSigninFields,
                          username: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <h4>Password</h4>
                    <input
                      placeholder="******"
                      type="password"
                      required
                      className="loginInput"
                      onChange={(e) => {
                        setEmployerSigninFields({
                          ...employerSigninFields,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </>
              )}

              <button className="loginButton" type="submit">
                {isFetching ? "Loading..." : "Continue"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
