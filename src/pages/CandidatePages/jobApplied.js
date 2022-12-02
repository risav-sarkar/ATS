import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getJobApplication } from "../../apicalls";
import JobAppliedCard from "../../components/common/JobAppliedCard/jobAppliedCard";
import { AuthContext } from "../../context/AuthContext";

const JobApplied = () => {
  const { token } = useContext(AuthContext);
  const {
    isError,
    isLoading,
    data: jobApplied,
  } = useQuery({
    queryKey: [`JobApplied`, token],
    queryFn: getJobApplication,
  });

  console.log(jobApplied);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something Went Wrong</h1>;

  return (
    <div className="jobAppliedContainer">
      <div className="jobAppliedContent">
        {!jobApplied.length ? <h2>No jobs applied to</h2> : null}

        {jobApplied.map((e) => {
          return <JobAppliedCard data={e} />;
        })}
      </div>
    </div>
  );
};

export default JobApplied;
