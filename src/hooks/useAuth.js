import { useEffect, useState } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { baseUrl } from "../service/baseUrl";

const LOGINURL = baseUrl + "api/login";

const firebaseConfig = {
  apiKey: "AIzaSyCLjMssma2A0VgITiHpUzCbCjFsnlLqNns",
  authDomain: "final-project-dibimbing.firebaseapp.com",
  projectId: "final-project-dibimbing",
  storageBucket: "final-project-dibimbing.appspot.com",
  messagingSenderId: "743693470352",
  appId: "1:743693470352:web:2d6b20b134d1ac2bd3a615",
  measurementId: "G-TPEY7Y25FH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export default function useUserAuth() {
  const [userLogin, setUserLogin] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");

  const reqUser = async (userEmail, displayName, profilePic, token) => {
    try {
      const res = await axios.post(
        LOGINURL,
        {
          userEmail: userEmail,
          displayName: displayName,
          profilePic: profilePic,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setUserLogin(res.data);
    } catch (error) {
      if (error.response) {
      }
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        const { email, displayName, photoURL } = userCred;
        userCred.getIdToken().then((token) => {
          setToken(token);
          if (token) {
          }
          reqUser(email, displayName, photoURL, token);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (userLogin) {
      if (userLogin.message) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    }
  }, [userLogin]);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
  };

  return {
    signInWithGoogle,
    token,
    isAuth,
    setIsAuth,
    userLogin,
  };
}
