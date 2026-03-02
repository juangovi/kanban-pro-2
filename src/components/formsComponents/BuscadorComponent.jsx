import React from 'react';
import { UserPlusIcon } from "@heroicons/react/24/outline";
import InputComponent from './InputComponent';
import { useState, useEffect } from 'react';
import { getUsers } from '../../services/queryService';
import ImgComponent from '../utilsComponents/ImgComponent';

export const BuscadorComponent = ({ onSelectUser }) => {
    const [buscar, setBuscar] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (buscar.length < 3) {
            setUsuarios([]);
            return;
        }
        const timeoutId = setTimeout(handleSearch, 500); // timeout para esperar al usuario y evitar llamadas innecesarias
        return () => clearTimeout(timeoutId);
    }, [buscar]);

    const handleSearch = async () => {
        setLoading(true);
        const usuarios = await getUsers(buscar);
        setLoading(false);
        setUsuarios(usuarios);
    };

    const handleChange = (e) => {
        setBuscar(e.target.value);
    };

    const handleSelectUser = (user) => {
        onSelectUser(user);
        setBuscar('');
        setUsuarios([]);
    };
    return (
        <div className='w-full relative'>
            <InputComponent Icon={UserPlusIcon} label="Buscar Miembros" name="miembros" placeholder="Miembros del proyecto" type="text" value={buscar} onChange={handleChange} />
            {usuarios.length > 0 && (
                <ul className="absolute top-full left-0 w-full text-ui-text bg-ui-secondary border border-border-color rounded-md shadow-lg mt-1 z-10">
                    {usuarios.map((usuario) => (
                        <div key={usuario.uid} onClick={() => handleSelectUser(usuario)} className="flex items-center justify-between bg-ui-secondary border border-border-color rounded-md px-2 py-1 cursor-pointer hover:bg-ui-bg">
                            <div className='flex items-center gap-2 text-ui-text'>
                                <ImgComponent className='w-8 h-8 rounded-full' src={usuario.photoURL} alt={usuario.displayName} />
                                <p>{usuario.displayName}</p>
                                <p className='text-xs text-ui-text-secondary'>{usuario.email}</p>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
            {loading && <p className="text-xs text-ui-text-secondary mt-1">Buscando...</p>}
        </div>

    );
}

export default BuscadorComponent;