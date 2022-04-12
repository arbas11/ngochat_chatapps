import axios from "axios";

import { baseUrl } from "./baseUrl";

const ADDHISTORYURL = `${baseUrl}api/history/addhistory`;
const SHOWHISTORYURL = `${baseUrl}api/history/showuserhistory`;

export const getContactHistory = (userEmail, contactEmail, token) => {
  try {
    const response = axios.post(
      SHOWHISTORYURL,
      {
        userEmail: userEmail,
        contactEmail: contactEmail,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return response;
  } catch (e) {
    console.log("error from axios get history", e);
  }
};

export const addToContactHistory = async (historyData, token) => {
  try {
    const response = await axios.post(ADDHISTORYURL, historyData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (e) {
    console.log("error from axios get history", e);
  }
};
