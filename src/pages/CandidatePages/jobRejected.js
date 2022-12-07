import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getJobApplications } from "../../apicalls";
import JobAppliedCard from "../../components/common/JobAppliedCard/jobAppliedCard";
import { AuthContext } from "../../context/AuthContext";

const JobRejected = () => {
  const { token } = useContext(AuthContext);
  const {
    isError,
    isLoading,
    data: jobs,
  } = useQuery({
    queryKey: [`JobApplied`, token],
    queryFn: getJobApplications,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something Went Wrong</h1>;

  return (
    <div className="jobAppliedContainer">
      <div className="jobAppliedContent">
        {!jobs.rejected.length ? <h2>No Rejectd Jobs</h2> : null}

        {jobs.rejected.map((e) => {
          return <JobAppliedCard data={e} />;
        })}
      </div>
    </div>
  );
};

export default JobRejected;
