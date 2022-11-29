import {
  faBriefcase,
  faMoneyBill,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const JobCard = () => {
  const id = 999;

  return (
    <Link to={`/job/${id}`} className="jobCardContainer">
      <div className="jobCardContent">
        <div>
          <p className="jobTitle">Front End Developer</p>
          <p className="jobCompany">IVDISPLAYS DIGITAL SERVICES PVT LTD</p>
          <p className="jobLocation">Kolkata, West Bengal</p>
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
          <p>
            Currently we are looking for a two experienced software developer
            with Php 7.2 skills having 3+ years of experience and having
            developed enterprise softwares.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
