import { db } from "../firebaseConfig";
import { doc, setDoc, collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export const createProyect = async (proyect, user) => {
    const proyectRef = doc(collection(db, "proyects"));
    await setDoc(proyectRef, {
        ...proyect,
        creacion: serverTimestamp(),
        owner: user.uid,
        miembros: [...proyect.miembros.filter((m) => m.uid !== user.uid), user.uid],
        lastMod: serverTimestamp(),
        tasks: 0,
        completedTasks: 0,
    });
}

export const getProyects = (users, callback) => {
    const proyectsRef = collection(db, "proyects");
    const q = query(proyectsRef, where("miembros", "array-contains", users.uid), orderBy("creacion", "desc"), limit(20));
    const querySnapshot = onSnapshot(q, (snapshot) => {
        const proyects = [];
        snapshot.forEach((doc) => {
            proyects.push({ ...doc.data(), id: doc.id });
        });
        callback(proyects);
    });
    return querySnapshot;
}

