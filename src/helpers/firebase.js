import firebase from "firebase";
// import platform from "platform";
import "firebase/firestore";
// import { getDatabase } from "firebase/database";

// console.log("from helpers", platform.name);

const firebaseConfig = {
  apiKey: "AIzaSyAUcFi6lzuw6AC6_OjaDZpLARzf5fjmH8E",
  authDomain: "notificationtest-4477f.firebaseapp.com",
  projectId: "notificationtest-4477f",
  storageBucket: "notificationtest-4477f.appspot.com",
  messagingSenderId: "416489889948",
  appId: "1:416489889948:web:ecc5902c3dbba150fc4d59",
};

firebase.initializeApp(firebaseConfig);

/*
export const getToken = () => {
 
    const messaging = firebase.messaging();
    return messaging
      .getToken({
        vapidKey:
          "BMF3TmetJ0GZYI6XNVQccQgmc6KVQhSrsCVRe3wvFUxuajLUi3DfghV3H4c6KFMUAr7wZL-qLGB4STf26YNTvG0",
      })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          // setTokenFound(true);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
          localStorage.setItem("fcmAdminToken", currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // setTokenFound(false);
          // shows on the UI that permission is required
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // catch error while creating client token
      });
  
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    // console.log("infireeeee");
      const messaging = firebase.messaging();
      messaging.onMessage((payload) => {
        resolve(payload);
        // console.log("in",payload)
      });
    
  });

  // const database = getDatabase(app);
  */

export default firebase;
