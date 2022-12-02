import { useEffect, useState } from "react";

import axios from "axios";

import App from "./App";

const AxiosClient = () => {
  const baseUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "";
      
      const [token, changeToken] = useState(undefined);
      const [userid, changeUserId] = useState(undefined);
      const [polls, changePolls] = useState([]);
      const [isAdmin, changeIsAdmin] = useState(false);
      
  const apiCall = (method, url, data) => {
    return axios({
      method,
      url: `${baseUrl}${url}`,
      data,
      headers: {
        authorization: token,
      },
    }).catch((error) => {
      throw error;
    });
  };

  const login = (loginFormValues) => {
    return apiCall("post", "/user/auth", loginFormValues);
  };

  const signup = (signupFormValues) => {
    return apiCall("post", "/user/newUser", signupFormValues)
  };

  const vote = (pollId, optionIndex) => {
    return apiCall('put', `/polls/vote/${pollId}`, { optionIndex })
  }

  const getPolls = () => {
    return apiCall('get', '/polls');
  }

  const createPoll = (pollFormValues) => {
    return apiCall("post", "/polls/create", pollFormValues)
  }

  const deletePoll = (pollid) => {
    return apiCall("delete", `/polls/${pollid}`)
  }


  useEffect(() => {
    if (token !== undefined) {
      getPolls()
        .then(({ data }) => {
          changePolls(data);
        })
    }
  }, [token])
      

  const client = {
    apiCall,
    token,
    changeToken,
    login,
    signup,
    userid,
    changeUserId,
    vote,
    getPolls,
    polls,
    changePolls,
    createPoll,
    changePolls,
    deletePoll,
    isAdmin,
    changeIsAdmin
  };

  return <App client={client} />;
};

export default AxiosClient;
