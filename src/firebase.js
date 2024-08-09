import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgBvMceh1OnUPLdg1lPYWEU6QkaK4fQ3k",
  authDomain: "netflix-clone-9f17d.firebaseapp.com",
  projectId: "netflix-clone-9f17d",
  storageBucket: "netflix-clone-9f17d.appspot.com",
  messagingSenderId: "990203982560",
  appId: "1:990203982560:web:eff346ea8d8b6cb8c15685"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log(error);
        alert(error)
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = async () => {
    signOut(auth);
}

export {auth, db, signup, login, logout};