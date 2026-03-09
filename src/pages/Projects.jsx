import React, { useEffect, useState } from 'react';

import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
import { ProjectCardComponent } from '../components/boardComponents/ProjectCardComponent';
import { useModal } from '../providers/ModalProvider';
import { CrearProyecto } from './CrearProyecto';
import { getProyects } from '../services/proyectService';
import { useLoading } from '../providers/LoadingProvider';
import { useAuthSession } from '../providers/AuthProvider';

export const Projects = () => {
    const { t } = useTranslation();

    const { openModal } = useModal();
    const { user } = useAuthSession();
    const [proyects, setProyects] = useState([]);
    const { setLoading } = useLoading()

    useEffect(() => {
        setLoading(true);
        const fetchProyects = getProyects(user, (proyects) => {
            console.log(proyects);
            setProyects(proyects);
            setLoading(false);
        });
        return () => {
            fetchProyects();
        }
    }, [user]);

    const handleNewBoard = () => {
        openModal(<CrearProyecto />);
    }
    return (
        <div className="flex-1 bg-ui-secondary p-5 overflow-y-auto justify-center">
            <div className="px-5 flex flex-row gap-3">
                <div className="bg-ui-bg px-3 hover:bg-brand-primary hover:text-white hover:cursor-pointer rounded-full text-ui-text-secondary">
                    {t("recientes")}
                </div>
                <div className="bg-ui-bg px-3 hover:bg-brand-primary hover:text-white hover:cursor-pointer rounded-full text-ui-text-secondary">
                    {t("favoritos")}
                </div>
                <div className="bg-ui-bg px-3 hover:bg-brand-primary hover:text-white hover:cursor-pointer rounded-full text-ui-text-secondary">
                    {t("alfabetico")}
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,240px)] justify-center gap-10 p-5">
                {proyects.map((proyect) => (
                    <ProjectCardComponent key={proyect.id} proyect={proyect} />
                ))}
                <div onClick={handleNewBoard} className="flex flex-col items-center justify-center p-5 w-60 h-60 bg-ui-bg/20 backdrop-blur-sm rounded-lg shadow-md border border-black/5 dark:border-white/50 border-dashed cursor-pointer">
                    <PlusIcon className="h-10 w-10 text-ui-text-secondary hover:text-brand-primary hover:scale-110 transition-all" />
                    <p className="text-sm text-ui-text/70 truncate">{t("newBoard")}</p>
                </div>
            </div>
        </div>
    );
}
