import { useParams } from "react-router-dom";
import {
  faBriefcase,
  faMoneyBill,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getJobById, postJobApplication } from "../apicalls";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "react-toastify";

const JobPage = () => {
  const { jobId } = useParams();
  const { token, profile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { isError, isLoading, data } = useQuery({
    queryKey: [`JobId${jobId}`, token, jobId],
    queryFn: getJobById,
    enabled: !!jobId,
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="jobPageContainer">
      <div className="jobPageContent">
        <div>
          <h1>{data.title}</h1>
          <h4 className="jobCompany">Company</h4>
          <p className="jobLocation">Location</p>
        </div>

        <div>
          <div className="matchContainer">
            <FontAwesomeIcon icon={faStar} />
            <p>80% match with your resume</p>
          </div>
          <button
            className="applyButton shadow"
            onClick={() => {
              setLoading(true);
              if (!token) {
                toast("Please Sign In first");
              } else {
                postJobApplication(
                  token,
                  profile.id.toString(),
                  jobId,
                  toast,
                  setLoading
                );
              }
            }}
          >
            {loading ? "Loading..." : "Apply now"}
          </button>
        </div>

        <div className="horizontalBar"></div>

        <h3>Full Job Description</h3>
        <p className="jobDescription">{data.description}</p>

        <div>
          <h3>Created At</h3>
          <p>{format(new Date(data.created_at), "do MMMM, u")}</p>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
