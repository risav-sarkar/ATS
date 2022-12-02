import "./styles/styles.css";
import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home";
import Auth from "./pages/auth";
import JobPage from "./pages/jobPage";
import ResumeUpload from "./pages/CandidatePages/resumeUpload";
import JobPosted from "./pages/EmployerPages/jobPosted";
import JobApplied from "./pages/CandidatePages/jobApplied";
import Profile from "./pages/profile";
import { initialFetch } from "./apicalls";
import EditProfile from "./pages/editProfile";

const App = () => {
  const { token, type, profile, dispatch } = useContext(AuthContext);
  console.log(token);
  useEffect(() => {
    initialFetch(dispatch);
  }, []);

  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: { staleTime: "Infinity" },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      {!token ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Auth type={"Signin"} />} />
          <Route path="/register" element={<Auth type={"Register"} />} />
          <Route path="/job/:jobId" element={<JobPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : token && type === "EMPLOYEE" ? (
        <Routes>
          <Route path="/" element={<Navigate to="/candidate" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/candidate" element={<Home />} />
          <Route path="/uploadresume" element={<ResumeUpload />} />
          <Route path="/job/:jobId" element={<JobPage />} />
          <Route path="/jobapplied" element={<JobApplied />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/employer" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/employer" element={<Home />} />
          <Route path="/job/:jobId" element={<JobPage />} />
          <Route path="/jobposted" element={<JobPosted />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  );
};

export default App;
