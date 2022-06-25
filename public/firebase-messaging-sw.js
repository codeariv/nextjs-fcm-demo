// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAnKU0n97qC3bZ11j_XHcsJ_317GEb10YE",
  authDomain: "nextjs-fcm-demo.firebaseapp.com",
  projectId: "nextjs-fcm-demo",
  storageBucket: "nextjs-fcm-demo.appspot.com",
  messagingSenderId: "166110595539",
  appId: "1:166110595539:web:b62fb43d23574549e08726",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener(
  "notificationclick",
  function (event) {
    switch (event.action) {
      case "open_url":
        clients.openWindow(event.notification.data.url); //which we got from above
        break;
      case "any_other_action":
        clients.openWindow("https://www.example.com");
        break;
    }
  },
  false
);
