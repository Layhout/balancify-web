// firebase-messaging-sw.js
importScripts(
    "https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js"
);

const params = new URL(location).searchParams;
const apiKey = params.get('apiKey');
const authDomain = params.get('authDomain');
const projectId = params.get('projectId');
const storageBucket = params.get('storageBucket');
const messagingSenderId = params.get('messagingSenderId');
const appId = params.get('appId');
const measurementId = params.get('measurementId');

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    appId,
    messagingSenderId,
    measurementId
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const { notification, data } = payload;
    const notificationTitle = notification.title;
    const notificationOptions = {
        body:
            notification.body,
        icon: './favicon.ico',
        data: { url: data?.url || "/" },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || "/";

    event.waitUntil(
        clients
            .matchAll({
                type: "window",
                includeUncontrolled: true,
            })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url.includes(targetUrl) && "focus" in client) {
                        return client.focus();
                    }
                }
                return clients.openWindow(targetUrl);
            })
    );
});
