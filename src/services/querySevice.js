import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const queryUsers = (buscar) => query(
    collection(db, "users"),
    where("displayNameLower", ">=", buscar.toLowerCase()),
    where("displayNameLower", "<=", buscar.toLowerCase() + '\uf8ff'),
    limit(5)
);

export const getUsers = async (buscar) => {
    const q = queryUsers(buscar);
    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        return [];
    }
};