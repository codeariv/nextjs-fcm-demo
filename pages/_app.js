import "../styles/globals.css";
import { requestForToken, onMessageListener } from "../firebase";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <>
      {show && (
        <div className="notification-toast info">
          <div className="outer-container">
            <i className="fas fa-info-circle"></i>
          </div>
          <div className="inner-container">
            <p>{notification?.title}</p>
            <p>{notification?.body}</p>
          </div>
          <div className="close-button" onClick={() => setShow(false)}>
            &times;
          </div>
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
