import { db } from "../firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export const createProyect = async (proyect, user) => {
    const proyectRef = doc(collection(db, "proyects"));
    await setDoc(proyectRef, {
        ...proyect,
        creacion: serverTimestamp(),
        owner: user.uid,
        miembros: [...proyect.miembros.map((m) => m.uid), user.uid],
    });
}