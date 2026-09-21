import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, onSnapshot, updateDoc } from "firebase/firestore";


export const getUserByArray = async (usersIds) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "in", usersIds));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
    });
    return users;
}

export const getUserById = async (userId) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", userId));
    const userSnapshot = await getDocs(q);
    const user = userSnapshot.docs[0].data();
    return user;
}

export const listenUser = (userId, callback) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", userId));
    return onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
            callback(snapshot.docs[0].data());
        }
    });
}

export const updateUser = async (userId, data) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", userId));
    const userSnapshot = await getDocs(q);
    const user = userSnapshot.docs[0];
    await updateDoc(user.ref, data);
}