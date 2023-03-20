import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAxfRK4DrttGRZ_UT9wNlDUcpxFlVGZjY",
  authDomain: "mypa-f9623.firebaseapp.com",
  projectId: "mypa-f9623",
  storageBucket: "mypa-f9623.appspot.com",
  messagingSenderId: "391263964120",
  appId: "1:391263964120:web:7191d0b0511c8d6cc740ad"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = getApps().length? getApp(): initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};