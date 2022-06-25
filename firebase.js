import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyAnKU0n97qC3bZ11j_XHcsJ_317GEb10YE",
  authDomain: "nextjs-fcm-demo.firebaseapp.com",
  projectId: "nextjs-fcm-demo",
  storageBucket: "nextjs-fcm-demo.appspot.com",
  messagingSenderId: "166110595539",
  appId: "1:166110595539:web:b62fb43d23574549e08726",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BP46Y0h4IBQT0ejQSmGlnXwBurp4itE9xTgqRM71sx35ok0rEgGp98F6s3_X3ltPI7DWIOjP5HtmJYCOyBuW2Q0",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
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
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
