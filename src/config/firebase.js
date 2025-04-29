import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signUpValidation = async (username, email, password) => {
  try {
    const account = await createUserWithEmailAndPassword(auth, email, password);
    const user = account.user;

    if (!user || !user.uid) {
      throw new Error("User UID is not available");
    }

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, I'm using StayChat App",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    throw error;
  }
};

export const loginValidation = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    throw error;
  }
};

export const logoutAccount = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    throw error;
  }
};

export const recoveryAccount = async (email) => {
  if (!email) {
    toast.error("Enter your email");
    return;
  }

  try {
    const user = collection(db, "users");
    const queue = query(user, where("email", "==", email));
    const result = await getDocs(queue);

    if (!result.empty) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email successfully sent!");
    } else {
      toast.error("Email does not exist!");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};
