import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import InputComponent from '../components/formsComponents/InputComponent';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import BotonComponent from '../components/formsComponents/BotonComponent';

export const HeadComponent = () => {
    const { t } = useTranslation();
    return (
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
    );
}