import React, { useEffect, useState } from 'react';
import ImgComponent from './ImgComponent';
import { getUserByArray } from '../../services/userService';

export const UserCountComponent = ({ members }) => {
    const maxMembers = 3;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUserByArray(members.slice(0, maxMembers));
            setUsers(users);
        }
        fetchUsers();
    }, [members]);

    return (
        <div className="mt-auto">
            <div className="flex -space-x-2">
                {users.map((user) => (
                    <ImgComponent key={user.uid} className="size-7 rounded-full border-2 border-white dark:border-slate-900 object-cover" data-alt="Team member portrait" src={user.photoURL} />
                ))}
                {members.length > maxMembers && (
                    <div className="size-7 rounded-full border-2 border-white dark:border-slate-900 bg-brand-primary flex items-center justify-center text-white font-bold">
                        +{members.length - maxMembers}
                    </div>
                )}
            </div>
        </div>
    );
}   