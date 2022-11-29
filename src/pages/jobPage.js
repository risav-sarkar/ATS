import { useParams } from "react-router-dom";
import {
  faBriefcase,
  faMoneyBill,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JobPage = () => {
  const { jobId } = useParams();

  return (
    <div className="jobPageContainer">
      <div className="jobPageContent">
        <div>
          <h1>Flutter Developer</h1>
          <h4 className="jobCompany">IVDISPLAYS DIGITAL SERVICES PVT LTD</h4>
          <p className="jobLocation">Kolkata, West Bengal</p>
        </div>

        <div>
          <div className="matchContainer">
            <FontAwesomeIcon icon={faStar} />
            <p>80% match with your resume</p>
          </div>
          <button className="applyButton shadow">Apply now</button>
        </div>

        <div className="horizontalBar"></div>

        <h3>Full Job Description</h3>
        <p className="jobDescription">
          JBK Technologies is a technologies and business consulting firm with
          offices in US and India. We have opening for Flutter Developers. Roles
          and Responsibilities We expect you to have your domain knowledge of
          Flutter, There are few skills which you need to have from get-go: You
          are a problem solver, polite and someone who values team members and
          customers . You respect time and understand, lost time never comes
          back You have the ability to explain your algorithms and solutions and
          understand how to ask questions with respect to mobile app development
          and web development scenarios You are a smart and energetic talent
          from engineering and computer science background Based on the
          situations you can contribute individually or work with team and make
          work productive and fun Desired Candidate
        </p>

        <div>
          <h3>Created At</h3>
          <p>25th November, 2022</p>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
