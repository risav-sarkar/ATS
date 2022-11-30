import {
  faBriefcase,
  faMoneyBill,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const JobCard = ({ data }) => {
  return (
    <Link to={`/job/${data.id}`} className="jobCardContainer">
      <div className="jobCardContent">
        <div>
          <p className="jobTitle">{data.title}</p>
          <p className="jobCompany">Company Name</p>
          {/* <p className="jobLocation">Kolkata, West Bengal</p> */}
        </div>

        <div className="matchContainer">
          <FontAwesomeIcon icon={faStar} />
          <p>80% match with your resume</p>
        </div>

        <div className="iconsContainer">
          <div className="iconsContent">
            <FontAwesomeIcon icon={faMoneyBill} />
            <p>40000 - 50000 in a month</p>
          </div>

          <div className="iconsContent">
            <FontAwesomeIcon icon={faBriefcase} />
            <p>Full-time</p>
          </div>
        </div>

        <div className="jobDescription">
          <p>{data.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
