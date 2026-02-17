import React from 'react';
import SeparatorComponent from '../components/utilsComponents/SeparatorComponent.jsx';
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useAuthSession } from "../providers/AuthProvider";




export const Dashboard = () => {
    const { user } = useAuthSession();

    return (
        <div className="flex">
            <div className="h-screen w-2.5/12 bg-ui-bg border-r border-gray-200 shadow-lg flex flex-col">
                <h1 className="text-2xl font-bold text-ui-text p-4">
                    Kanban Pro
                </h1>
                <SeparatorComponent />
                <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                    <ViewColumnsIcon className="h-6 w-6 shrink-0" /> boards
                </button>
                <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 shrink-0" /> tasks
                </button>
                <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                    <CalendarIcon className="h-6 w-6 shrink-0" /> calendar
                </button>
                <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                    <Cog6ToothIcon className="h-6 w-6 shrink-0" /> settings
                </button>
                <footer className="mt-auto flex justify-center">
                    <button className="text-ui-text bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-black/10 dark:border-white/20 w-full rounded-lg m-5 p-2 flex items-center gap-5 justify-center min-w-0">
                        <img src={user.photoURL} alt={user.displayName} className='w-10 h-10 rounded-full object-cover' />
                        <div className="flex flex-col text-left min-w-0">
                            <span className="text-sm truncate block">
                                {user.displayName}
                            </span>
                            <span className="text-xs truncate block">
                                {user.email}
                            </span>
                        </div>
                    </button>
                </footer>
            </div>
            <div className="h-screen">
                adios
            </div>
        </div>
    );
}

export default Dashboard;
