import axios from "axios";
const BaseUrl = "https://atstemp.herokuapp.com";

//Auth
export const signout = (dispatch) => {
  localStorage.removeItem("User_ATS_Token");
  localStorage.removeItem("User_ATS_Type");

  dispatch({
    type: "USER_SIGNOUT",
  });
};

//Employee Auth
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

//Employer Auth

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

//Job Search
export const getJobListSearch = async (params) => {
  const token = params.queryKey[1];
  const searchTerm = params.queryKey[2];
  const res = await axios.get(
    `${BaseUrl}/employee/search-job-list/?search=${searchTerm}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return res.data;
};

//Resume
export const postResume = async (file, toast) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("employee_id", "2");

    const res = await axios.post(`${BaseUrl}/employee/upload-resume`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast("Resume Uploaded");
  } catch (err) {
    console.log(err);
    toast(err.message);
  }
};
