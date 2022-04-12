import axios from "axios";
import { baseUrl } from "./baseUrl";

const LOGOUTURL = baseUrl + "api/logout";

export const updateIsLogout = async (userEmail, token) => {
  try {
    const response = await axios.post(
      LOGOUTURL,
      {
        userEmail: userEmail,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
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
