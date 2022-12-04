import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBorderAll,
  faCircleCheck,
  faCircleXmark,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import JobApplied from "./CandidatePages/jobApplied";
import JobSelected from "./CandidatePages/jobSelected";
import JobRejected from "./CandidatePages/jobRejected";

const Dashboard = () => {
  const { type } = useContext(AuthContext);
  const [tabbtn, setTabBtn] = useState(0);

  const employeeTabs = [
    { name: "Jobs Applied" },
    { name: "Jobs Selected" },
    { name: "Jobs Rejected" },
    { name: "Interview" },
  ];

  const employerTabs = [
    { name: "Applied" },
    { name: "Selected" },
    { name: "Rejected" },
    { name: "View" },
  ];

  return (
    <div className="dashboardContainer">
      <div className="navBar">
        <div className="navButtons">
          {type === "EMPLOYEE"
            ? employeeTabs.map((e, index) => {
                return (
                  <button
                    className={index === tabbtn ? "selected" : null}
                    onClick={() => {
                      setTabBtn(index);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        index === 0
                          ? faBorderAll
                          : index === 1
                          ? faCircleCheck
                          : index === 2
                          ? faCircleXmark
                          : faChalkboardUser
                      }
                    />
                    <p>{e.name}</p>
                  </button>
                );
              })
            : employerTabs.map((e, index) => {
                return (
                  <button
                    className={index === tabbtn ? "selected" : null}
                    onClick={() => {
                      setTabBtn(index);
                    }}
                  >
                    <FontAwesomeIcon icon={faHome} />
                    <p>{e.name}</p>
                  </button>
                );
              })}
        </div>
      </div>

      <div className="dashboardContent">
        {type === "EMPLOYEE" ? (
          tabbtn === 0 ? (
            <>
              <h1>{employeeTabs[tabbtn].name}</h1>
              <JobApplied />
            </>
          ) : tabbtn === 1 ? (
            <>
              <h1>{employeeTabs[tabbtn].name}</h1>
              <JobSelected />
            </>
          ) : tabbtn === 2 ? (
            <>
              <h1>{employeeTabs[tabbtn].name}</h1>
              <JobRejected />
            </>
          ) : (
            <h1>{employeeTabs[tabbtn].name}</h1>
          )
        ) : (
          <h1>{employerTabs[tabbtn].name}</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
