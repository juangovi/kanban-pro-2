import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';


export const getUsers = async (buscar) => {
    const usersRef = collection(db, "users");
    const qName = query(
        usersRef,
        where("displayNameLower", ">=", buscar.toLowerCase()),
        where("displayNameLower", "<=", buscar.toLowerCase() + '\uf8ff'),
        limit(5)
    );
    const qEmail = query(
        usersRef,
        where("email", ">=", buscar.toLowerCase()),
        where("email", "<=", buscar.toLowerCase() + '\uf8ff'),
        limit(5)
    );

    try {
        const [snapName, snapEmail] = await Promise.all([
            getDocs(qName),
            getDocs(qEmail)
        ]);
        const results = [...snapName.docs, ...snapEmail.docs].map(doc => ({
            ...doc.data()
        }));
        const uniqueUsers = Array.from(new Map(results.map(user => [user.uid || user.id, user])).values());
        return uniqueUsers;
    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        return [];
    }
};