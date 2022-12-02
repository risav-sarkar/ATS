import axios from "axios";
export const BaseUrl = "https://atstemp.herokuapp.com";

//Auth
export const initialFetch = async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("User_ATS_Token")) || null;
  const type = JSON.parse(localStorage.getItem("User_ATS_Type")) || null;

  if (token && type) {
    try {
      const res = await axios.get(`${BaseUrl}/employee/data/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch({ type: "SET_TOKEN", payload: token });
      dispatch({ type: "SET_TYPE", payload: type });
      dispatch({ type: "SET_PROFILE", payload: res.data });
    } catch (err) {
      signout(dispatch);
    }
  }
};

export const signout = (dispatch) => {
  localStorage.removeItem("User_ATS_Token");
  localStorage.removeItem("User_ATS_Type");

  dispatch({
    type: "USER_SIGNOUT",
  });
};

export const employeeRegister = async (req, dispatch, toast) => {
  dispatch({ type: "LOGIN_USER_START" });
  try {
    const res = await axios.post(`${BaseUrl}/user/register/`, req);
    await employeeLogin(
      { username: req.email, password: req.password },
      dispatch
    );
  } catch (err) {
    console.log(err);
    toast(err.message);
    dispatch({ type: "LOGIN_USER_FAILURE", payload: err });
  }
};

export const employeeLogin = async (req, dispatch, toast) => {
  dispatch({ type: "LOGIN_USER_START" });
  try {
    const res = await axios.post(`${BaseUrl}/employee/login-token/`, req);

    localStorage.setItem("User_ATS_Token", JSON.stringify(res.data.token));
    localStorage.setItem("User_ATS_Type", JSON.stringify("EMPLOYEE"));

    await setEmployeeProfile(res.data.token, dispatch);

    dispatch({
      type: "LOGIN_USER_SUCCESS",
      payload: { token: res.data.token, type: "EMPLOYEE" },
    });
  } catch (err) {
    console.log(err);
    toast(err.message);
    dispatch({ type: "LOGIN_USER_FAILURE", payload: err });
  }
};

//Profile
export const setEmployeeProfile = async (token, dispatch) => {
  try {
    const res = await axios.get(`${BaseUrl}/employee/data/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    dispatch({
      type: "SET_PROFILE",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getEmployeeProfile = async (params) => {
  const token = params.queryKey[1];
  const res = await axios.get(`${BaseUrl}/employee/data/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};

export const editEmployeeProfile = async (
  token,
  data,
  setLoading,
  dispatch,
  toast
) => {
  try {
    const res = await axios.patch(`${BaseUrl}/employee/data/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    await setEmployeeProfile(token, dispatch);
    setLoading(false);
    toast("Profile updated successfully");
  } catch (err) {
    setLoading(false);
  }
};

//Job
export const getJobList = async (params) => {
  const token = params.queryKey[1];
  const res = await axios.get(`${BaseUrl}/employee/job-list/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};

export const getJobListSearch = async (params) => {
  const token = params.queryKey[1];
  const searchTerm = params.queryKey[2];
  const res = await axios.get(
    `${BaseUrl}/jobs/search-job-list/?search=${searchTerm}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return res.data;
};

export const getJobById = async (params) => {
  const token = params.queryKey[1];
  const id = params.queryKey[2];
  const res = await axios.get(`${BaseUrl}/jobs/job-list/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};

export const getJobApplication = async (params) => {
  const token = params.queryKey[1];
  const res = await axios.get(`${BaseUrl}/jobs/currentjobs/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};

export const postJobApplication = async (token, jobId, toast, setLoading) => {
  try {
    const res = await axios.post(
      `${BaseUrl}/jobs/currentjobs/`,
      { job: jobId },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    toast("Job Successfully Applied");
    setLoading(false);
  } catch (err) {
    console.log(err);
    toast(err.message);
    setLoading(false);
  }
};

//Resume
export const postResume = async (file, token, toast, setLoading) => {
  try {
    const data = new FormData();
    data.append("file", file);

    const res = await axios.post(`${BaseUrl}/employee/upload-resume/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    });
    console.log(res.data);
    toast("Resume Uploaded");
    setLoading(false);
  } catch (err) {
    console.log(err);
    toast(err.message);
    setLoading(false);
  }
};

export const getResumes = async (params) => {
  const token = params.queryKey[1];
  const res = await axios.get(`${BaseUrl}/employee/resume/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};
