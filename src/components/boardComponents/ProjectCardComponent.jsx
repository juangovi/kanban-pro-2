import React from 'react';
import { StarIcon } from "@heroicons/react/24/solid";
import { ProgressBarComponent } from '../utilsComponents/ProgressBarComponent';
import { useTranslation } from 'react-i18next';
import ImgComponent from '../utilsComponents/ImgComponent';

export const ProjectCardComponent = () => {
    const { t } = useTranslation();
    return (
        <div className="relative flex flex-col p-5 w-60 h-60 bg-ui-bg/70 backdrop-blur-sm rounded-lg shadow-md border border-black/5 dark:border-white/5 cursor-pointer">
            <div className="mb-5">
                <h1 className="text-2xl font-bold text-ui-text truncate">{t("card")}</h1>
                <p className="text-sm text-ui-text/70 truncate">updated 2 hours ago</p>
            </div>
            <div className="">
                <ProgressBarComponent progreso={60} title={"progreso"} />
            </div>
            <div className="mt-auto">
                <div className="flex -space-x-2">
                    <ImgComponent className="size-7 rounded-full border-2 border-white dark:border-slate-900 object-cover" data-alt="Team member portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChKLak0WaYj8U4bIJjL0XRIC03BmUUBqVFRmRdbU11pqgJw7TyKH-Y5382TZ4bq6iq4P3GTqzwNGaFLZl0nLyPN3wHxLxvySCt_sRwqMoxmTtedFtKuv9MTQYXZY5NXt9miL8CnpTXZLAF9ADmdbzrr-3hfd-TTaZiBInXp3Aqfnf2aNyWkAZffdWvlkmNBRCupukJceMnWijWo4Q2dA4B2VnTfu6w93x5aOrL20x1sSmYe43K_raEobOcAKgHHiievxVlK7z05A" />
                    <ImgComponent className="size-7 rounded-full border-2 border-white dark:border-slate-900 object-cover" data-alt="Team member portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWNiTfzU4aSxgO9yRNsYEcFUkCw0K593hVeSRgPq1aVBgjdgQkePDoHEK0_CK5XR3EvPtXnrtLX0xzCORbQHGZDbgTG6H87wEklRvSCABN8lByust4uan4bxtIacdChpO2QDud0ZgnGJvGiILURSMykd-pVpn_cbzKksD-_PCcWVe6rHIZynaur_Ql9h7FxwbeUjD_CpR7qeP8GK6k_Ty-Drsj4XZNy_wgMB41RNrlKMIBOeLCFAL7hAP_GWTV7G-rN3Wuj8Vplw" />
                </div>
            </div>
            <button className="absolute top-5 right-5">
                <StarIcon className="h-6 w-6 text-ui-text-secondary hover:text-yellow-500 hover:scale-110 transition-all" />
            </button>
        </div>
    );
}