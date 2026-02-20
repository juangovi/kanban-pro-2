import React from 'react';
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useAuthSession } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import InputComponent from '../components/formsComponents/InputComponent';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import BotonComponent from '../components/formsComponents/BotonComponent';




export const Dashboard = () => {
    const { user } = useAuthSession();

    const { t } = useTranslation();

    return (
        <div className="flex h-screen overflow-hidden">
            <sidebar className="w-64 shrink-0 bg-ui-bg shadow-lg flex flex-col">
                <h1 className="text-2xl font-bold text-ui-text p-4 flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="w-10 h-10" /> {t("appName")}
                </h1>

                <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                    <ViewColumnsIcon className="h-6 w-6 shrink-0" /> {t("boards")}
                </button>
                <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 shrink-0" /> {t("tasks")}
                </button>
                <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                    <CalendarIcon className="h-6 w-6 shrink-0" /> {t("calendar")}
                </button>
                <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                    <Cog6ToothIcon className="h-6 w-6 shrink-0" /> {t("settings")}
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
            </sidebar>
            <div className="flex-1 flex flex-col min-w-0">
                <header className="w-full h-20 bg-ui-bg shadow-lg flex items-center px-6 gap-6">
                    <div className="flex items-center gap-2">
                        <ChevronDownIcon className="h-6 w-6 text-ui-text" />
                        <h2 className="text-2xl font-bold text-ui-text uppercase">{t("boards")}</h2>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="w-full max-w-md">
                            <InputComponent placeholder={t("search")} Icon={MagnifyingGlassIcon} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <BotonComponent text={t("newBoard")} Icon={PlusIcon} />
                        <button className="text-ui-text px-4 py-2 mx-5 rounded-md flex items-center gap-5  hover:bg-brand-primary hover:text-white">
                            <BellIcon className="h-6 w-6 text-ui-text" />
                        </button>
                    </div>
                </header>
                <div className="border-2 border-dashed border-ui-text-secondary/20 h-full rounded-3xl flex items-center justify-center">
                    el resto
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
