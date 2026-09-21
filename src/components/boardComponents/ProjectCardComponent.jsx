import React, { useState, useEffect } from 'react';
import { StarIcon } from "@heroicons/react/24/solid";
import { ProgressBarComponent } from '../utilsComponents/ProgressBarComponent';
import { useTranslation } from 'react-i18next';
import { UserCountComponent } from '../utilsComponents/UserCountComponent';
import { useAuthSession } from '../../providers/AuthProvider';
import { updateUser } from '../../services/userService';

export const ProjectCardComponent = ({ proyect }) => {
    let progreso = proyect.completedTasks / proyect.tasks * 100;
    const { user } = useAuthSession();
    const [favorito, setFavorito] = useState(user?.proyectFav?.includes(proyect.id));

    useEffect(() => {
        setFavorito(user?.proyectFav?.includes(proyect.id));
    }, [user]);

    const handleFavorito = () => {
        if (favorito) {
            if (user.proyectFav) {
                updateUser(user.uid, { proyectFav: user.proyectFav.filter((id) => id !== proyect.id) });
            }
        } else {
            if (user.proyectFav) {
                updateUser(user.uid, { proyectFav: [...user.proyectFav, proyect.id] });
            } else {
                updateUser(user.uid, { proyectFav: [proyect.id] });
            }
        }
        setFavorito(!favorito);
    }

    if (!proyect.tasks || proyect.tasks === 0) {
        progreso = 0;
    }
    return (
        <div className="relative flex flex-col p-5 w-60 h-60 bg-ui-bg/70 backdrop-blur-sm rounded-lg shadow-md border border-black/5 dark:border-white/5 cursor-pointer">
            <div className="mb-5 ">
                <h1 className="text-2xl font-bold text-ui-text truncate max-w-[80%]">{proyect.nombre}</h1>
                <p className="text-sm text-ui-text/70">
                    updated {proyect.lastMod?.toDate ? proyect.lastMod.toDate().toLocaleDateString() : '...'}
                </p>
            </div>
            <div className="">
                <ProgressBarComponent progreso={progreso} title={"progreso"} />
            </div>
            <UserCountComponent members={proyect.miembros} />
            <button className="absolute top-5 right-5">
                <StarIcon className={`h-6 w-6 text-ui-text-secondary hover:text-yellow-500 hover:scale-110 transition-all cursor-pointer ${favorito ? "text-yellow-500" : "text-ui-text-secondary"}`} onClick={() => handleFavorito()} />
            </button>
        </div>
    );
}