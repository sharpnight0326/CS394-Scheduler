import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import {useEffect, useState} from "react";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCWvTwcNb5yBSFzwDbDUMnsQ0xcXfQmxnE",
    authDomain: "cs394-course-scheduler.firebaseapp.com",
    databaseURL: "https://cs394-course-scheduler-default-rtdb.firebaseio.com",
    projectId: "cs394-course-scheduler",
    storageBucket: "cs394-course-scheduler.appspot.com",
    messagingSenderId: "35817590526",
    appId: "1:35817590526:web:9f249f71be5f76985b9faf",
    measurementId: "G-X9GN5JG7LC"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        onIdTokenChanged(getAuth(firebase), setUser);
    }, []);

    return [user];
};