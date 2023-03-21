import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyDg-r3S9SYP5IaRYDv_Sp6dE8NuFj0PmhE",
  authDomain: "eshop-f466f.firebaseapp.com",
  projectId: "eshop-f466f",
  storageBucket: "eshop-f466f.appspot.com",
  messagingSenderId: "226536349373",
  appId: "1:226536349373:web:4e73cde4ef50304290a1d4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app
