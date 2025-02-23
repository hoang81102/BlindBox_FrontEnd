import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuZAtHiQP0IeWescZ4Frp5aWZdMTVuG04",
  authDomain: "mystic-blind-box.firebaseapp.com",
  projectId: "mystic-blind-box",
  storageBucket: "mystic-blind-box.appspot.com",
  messagingSenderId: "530082065354",
  appId: "1:530082065354:web:f03c41fe74120da9157d33",
  measurementId: "G-J7JFS6ERV4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
