import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyCK2aoRowS8V80kPnVOgUCDnwplubfsDd0",
  authDomain: "socialape-faf3f.firebaseapp.com",
  projectId: "socialape-faf3f",
  storageBucket: "socialape-faf3f.appspot.com",
  messagingSenderId: "49331774397",
  appId: "1:49331774397:web:bd12d503860d77bdc068d4",
  measurementId: "G-SC0JK8JV0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app)


