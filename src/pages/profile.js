import {
  faAngleRight,
  faDownload,
  faEye,
  faLocation,
  faMessage,
  faPhone,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getResumes, getEmployeeProfile, signout, BaseUrl } from "../apicalls";
import { AuthContext } from "../context/AuthContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Profile = () => {
  const { dispatch, token } = useContext(AuthContext);

  const { isLoading: profileLoading, data: profile } = useQuery({
    queryKey: ["Profile", token],
    queryFn: getEmployeeProfile,
  });

  const { isLoading: resumeLoading, data: resumes } = useQuery({
    queryKey: ["EmployeeResumes", token],
    queryFn: getResumes,
  });

  if (profileLoading || resumeLoading) return <h1>Loading...</h1>;

  return (
    <div className="profileContainer">
      <div className="profileContent">
        <div className="profileHeader">
          <div>
            <h1>{`${profile.first_name} ${profile.last_name}`}</h1>
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

        <Link to="/editprofile">
          <button className="editContainer">
            <FontAwesomeIcon icon={faMessage} />
            <p>abc@gmail.com</p>
            <FontAwesomeIcon icon={faPhone} />
            <p>Add Phone Number</p>
            <FontAwesomeIcon icon={faLocation} />
            <p>{`${profile.city}, ${profile.state}, ${profile.country}`}</p>

            <div className="rightIcon">
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </button>
        </Link>

        <div className="resumeContainer">
          <h3>Resume</h3>

          {!resumes.length ? <h3>No resumes added</h3> : null}
          {resumes.map((e) => {
            return (
              <div className="resumeBox">
                <div className="resumeIcon">
                  <svg
                    width="44"
                    height="64"
                    viewBox="0 0 44 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M26 1.09384C26 0.489727 26.4897 0 27.0938 0C27.674 0 28.2305 0.230486 28.6408 0.640755L43.3592 15.3592C43.7695 15.7695 44 16.326 44 16.9062C44 17.5103 43.5103 18 42.9062 18H28C26.8954 18 26 17.1046 26 16L26 1.09384Z"
                      fill="#D4D2D0"
                    ></path>
                    <path
                      d="M0 2C0 0.895431 0.895431 0 2 0H27C28.1046 0 29 0.895431 29 2V13C29 14.1046 29.8954 15 31 15H42C43.1046 15 44 15.8954 44 17V62C44 63.1046 43.1046 64 42 64H2C0.895431 64 0 63.1046 0 62V2Z"
                      fill="#E4E2E0"
                    ></path>
                    <path
                      d="M6 7C6 6.44772 6.44772 6 7 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H7C6.44772 8 6 7.55228 6 7Z"
                      fill="#D4D2D0"
                    ></path>
                    <path
                      d="M6 11C6 10.4477 6.44772 10 7 10H21C21.5523 10 22 10.4477 22 11C22 11.5523 21.5523 12 21 12H7C6.44772 12 6 11.5523 6 11Z"
                      fill="#D4D2D0"
                    ></path>
                    <path
                      d="M6 15C6 14.4477 6.44772 14 7 14H21C21.5523 14 22 14.4477 22 15C22 15.5523 21.5523 16 21 16H7C6.44772 16 6 15.5523 6 15Z"
                      fill="#D4D2D0"
                    ></path>
                    <path
                      d="M6 21C6 20.4477 6.44772 20 7 20H37C37.5523 20 38 20.4477 38 21C38 21.5523 37.5523 22 37 22H7C6.44772 22 6 21.5523 6 21Z"
                      fill="#D4D2D0"
                    ></path>
                    <path
                      d="M6 25C6 24.4477 6.44772 24 7 24H37C37.5523 24 38 24.4477 38 25C38 25.5523 37.5523 26 37 26H7C6.44772 26 6 25.5523 6 25Z"
                      fill="#D4D2D0"
                    ></path>
                    <path
                      d="M6 29C6 28.4477 6.44772 28 7 28H37C37.5523 28 38 28.4477 38 29C38 29.5523 37.5523 30 37 30H7C6.44772 30 6 29.5523 6 29Z"
                      fill="#D4D2D0"
                    ></path>
                    <path
                      d="M6 33C6 32.4477 6.44772 32 7 32H37C37.5523 32 38 32.4477 38 33C38 33.5523 37.5523 34 37 34H7C6.44772 34 6 33.5523 6 33Z"
                      fill="#D4D2D0"
                    ></path>
                    <path
                      d="M0 44H44V62C44 63.1046 43.1046 64 42 64H2C0.895431 64 0 63.1046 0 62V44Z"
                      fill="#2557a7"
                    ></path>
                    <text aria-hidden="true" class="css-or7wqn e1wnkr790">
                      <tspan x="10" y="58">
                        PDF
                      </tspan>
                    </text>
                  </svg>
                </div>

                <div className="textContainer">
                  <h3>{e.resume.substring(e.resume.lastIndexOf("/") + 1)}</h3>
                  <p>{`Added ${format(
                    new Date(e.date_of_upload),
                    "MMM d, u"
                  )}`}</p>
                  <p>
                    <FontAwesomeIcon icon={faEye} /> Public
                  </p>
                </div>

                <a
                  className="downloadBtn"
                  href={`${BaseUrl}${e.resume}`}
                  target="_blank"
                  download
                >
                  <FontAwesomeIcon icon={faDownload} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
