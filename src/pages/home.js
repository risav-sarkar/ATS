import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/common/JobCard/jobCard";
import { AuthContext } from "../context/AuthContext";
import { Modal } from "react-responsive-modal";
import { useQuery } from "@tanstack/react-query";
import { getJobList, getJobListSearch } from "../apicalls";

const FilterBtn = ({ name, onClickAction }) => {
  return (
    <button
      className="filterBtn"
      onClick={() => {
        onClickAction();
      }}
    >
      <p>{name}</p>
      <FontAwesomeIcon icon={faAngleDown} />
    </button>
  );
};

const Home = () => {
  const { token, type } = useContext(AuthContext);
  const [searchBarContent, setSearchBarContent] = useState({
    jobTitle: "",
    location: "",
  });
  const [filterFields, setFilterFields] = useState({});
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, steFilteredJobs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const FilterBtnsList = [
    { name: "Date", objName: "date" },
    { name: "Job Type", objName: "jobType" },
    { name: "Education Level", objName: "eduLevel" },
    { name: "Location", objName: "location" },
    { name: "Mode", objName: "mode" },
  ];

  const FilterBtnOptions = {
    date: ["Last 24 Hours", "Last 3 Days", "Last 7 Days", "Last 14 Days"],
    jobType: ["Full Time", "Part Time", "Contract", "Internship"],
    eduLevel: ["Bachelor's Degree", "Master's Degree", "Diploma", "Doctorate"],
    location: ["Bangalore", "Mumbai", "Delhi"],
    mode: ["Work from home", "Work from office", "Hybrid"],
  };

  const emulateFetch = (_) => {
    return new Promise((resolve) => {
      resolve([{ data: "ok" }]);
    });
  };

  const {
    isError: jobListError,
    isLoading: jobListLoading,
    isFetched: isJobListSearchFetched,
    isRefetching: jobListRefetching,
    data: jobListSearch,
    refetch,
  } = useQuery({
    queryKey: ["JobList", token, getJobListSearch.jobTitle, emulateFetch],
    queryFn: getJobListSearch,
    enabled: false,
    initialData: [],
  });

  return (
    <div className="homeContainer">
      <div className="homeContent">
        <div className="searchContainer">
          <form
            className="searchForm"
            onSubmit={(e) => {
              e.preventDefault();
              refetch();
            }}
          >
            <div className="inputContainer">
              <h4>What</h4>
              <input
                placeholder="Job title, keywords, or company"
                type="text"
                required
                value={searchBarContent.jobTitle}
                onChange={(e) =>
                  setSearchBarContent({
                    ...searchBarContent,
                    jobTitle: e.target.value,
                  })
                }
              />
            </div>

            <div className="inputContainer">
              <h4>Where</h4>
              <input
                placeholder="City, state, or pin code"
                type="text"
                value={searchBarContent.location}
                onChange={(e) =>
                  setSearchBarContent({
                    ...searchBarContent,
                    location: e.target.value,
                  })
                }
              />
            </div>

            <button className="submitBtn" type="submit">
              <h4>Find Jobs</h4>
            </button>
          </form>
          {jobListSearch.length ? (
            <div className="filterContainer">
              <div className="filterContent">
                {FilterBtnsList.map((e) => {
                  return (
                    <FilterBtn
                      name={e.name}
                      onClickAction={() => {
                        setIsModalOpen(true);
                        setModalType(e.objName);
                      }}
                    />
                  );
                })}
              </div>

              {Object.keys(filterFields).length ? (
                <div className="filterFieldsChosenContainer">
                  <div className="filterFieldsChosenContent">
                    {Object.keys(filterFields).map((item) => {
                      return filterFields[item].map((e, index) => {
                        return (
                          <button
                            className="filterFieldsChosen"
                            onClick={() => {
                              let arr = [...filterFields[item]];
                              arr.splice(index, 1);

                              if (arr.length === 0) {
                                let obj = filterFields;
                                delete obj[item];

                                setFilterFields({ ...obj });
                              } else
                                setFilterFields({
                                  ...filterFields,
                                  [item]: [...arr],
                                });
                            }}
                          >
                            {e}
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        );
                      });
                    })}
                    <button
                      onClick={() => {
                        setFilterFields({});
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              ) : null}

              <Modal
                open={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                }}
                showCloseIcon={false}
                center
              >
                <div className="filterModalContainer">
                  {FilterBtnOptions[modalType]?.map((e) => {
                    return (
                      <button
                        className={`filterModalBtn ${
                          filterFields[modalType]?.includes(e)
                            ? "filterBtnSelected"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            !filterFields[modalType] ||
                            !filterFields[modalType].includes(e)
                          )
                            setFilterFields({
                              ...filterFields,
                              [modalType]: filterFields[modalType]
                                ? [...filterFields[modalType], e]
                                : [e],
                            });
                          else {
                            let filteredArray = filterFields[modalType].filter(
                              function (i) {
                                return i !== e;
                              }
                            );

                            if (filteredArray.length === 0) {
                              let obj = filterFields;
                              delete obj[modalType];

                              setFilterFields({ ...obj });
                            } else
                              setFilterFields({
                                ...filterFields,
                                [modalType]: [...filteredArray],
                              });
                          }
                        }}
                      >
                        {e}
                      </button>
                    );
                  })}
                </div>
              </Modal>
            </div>
          ) : null}

          {token && type === "EMPLOYEE" ? (
            <div className="resumeUploadBtn">
              <Link to="/uploadresume">
                <button>Upload Resume</button>
              </Link>
            </div>
          ) : null}
        </div>

        <div className="jobCardsContainer">
          {isJobListSearchFetched ? (
            !jobListSearch.length ? (
              <div>
                <h3>No Jobs Found</h3>
              </div>
            ) : (
              <>
                <JobCard />
                <JobCard />
                <JobCard />
              </>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
