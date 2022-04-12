import axios from "axios";
import { baseUrl } from "./baseUrl";

const GETUSERURL = baseUrl + "api/user/getuser";
const CREATEUSERURL = baseUrl + "api/user/createuser";
const UPDATEUSERDATAURL = baseUrl + "api/user/updatenameandpic";

export const createUser = async (userEmail, displayName) => {
  try {
    const response = await axios.post(CREATEUSERURL, {
      userEmail: userEmail,
      displayName: displayName,
    });
    return response.data;
  } catch (e) {
    console.log("error dari service axios", e);
  }
};

export const getUserByEmail = async (userEmail, token) => {
  try {
    const response = await axios.post(
      GETUSERURL,
      {
        userEmail: userEmail,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log("error dari service axios", e);
  }
};

export const updateUserData = async (
  userEmail,
  newDisplayName,
  newProfilePic,
  newUserStatus,
  token
) => {
  try {
    const response = await axios.post(
      UPDATEUSERDATAURL,
      {
        userEmail: userEmail,
        displayName: newDisplayName,
        profilePic: newProfilePic,
        userStatus: newUserStatus,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
