import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const JobAppliedCard = ({ data }) => {
  return (
    <Link to={`/job/${data.job.id}`} className="jobAppliedCardContainer">
      <div>
        <h3 className="jobTitle">{data.job.title}</h3>
        <p className="jobCompany">Company Name</p>
        <p className="jobLocation">Kolkata, West Bengal</p>
      </div>

      <div className="statusContainer">
        <p>Status</p>
        <div className="statusNameContainer">
          <h4>PENDING</h4>
        </div>
      </div>
    </Link>
  );
};

export default JobAppliedCard;
