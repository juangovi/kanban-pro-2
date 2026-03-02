import React from 'react';
import InputComponent from '../components/formsComponents/InputComponent';
import SeparatorComponent from '../components/utilsComponents/SeparatorComponent';
import { useReducer } from 'react';
import { formReducer } from '../reducers/formReducer';
import { CalendarIcon } from '@heroicons/react/24/outline';
import * as z from "zod";
import BuscadorComponent from '../components/formsComponents/BuscadorComponent';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FolderIcon } from "@heroicons/react/24/outline";
import BotonComponent from '../components/formsComponents/BotonComponent';
import ImgComponent from '../components/utilsComponents/ImgComponent';




export const CrearProyecto = () => {

    const schema = z.object({
        nombre: z.string(),
        fecha: z.date(),
        descripcion: z.string(),
        miembros: z.array()
    });

    const handleChange = (e) => {
        dispatch({ type: 'change_field', payload: { name: e.target.name, value: e.target.value } });
    }

    const handleSelectUser = (user) => {
        if (state.campos.miembros.find((m) => m.uid === user.uid)) return;
        dispatch({ type: 'change_field', payload: { name: 'miembros', value: [...state.campos.miembros, user] } });
    }

    const initialState = {
        campos: {
            nombre: '',
            fecha: new Date(),
            descripcion: '',
            miembros: [],
        },
        errores: {
            nombre: '',
            fecha: '',
            descripcion: '',
            miembros: '',
        }
    };

    const [state, dispatch] = useReducer(formReducer, initialState);

    return (

        <div className="w-full flex-1 p-5">
            <div className='mb-5'>
                <h1 className="text-2xl font-bold text-ui-text">Crear Proyecto</h1>
            </div>
            <SeparatorComponent />
            <form className='flex flex-col gap-5 '>
                <div className='flex sm:flex-row w-full gap-5 flex-col'>
                    <InputComponent Icon={FolderIcon} error={state.errores.nombre} label="Nombre" name="nombre" placeholder="Nombre del proyecto" value={state.campos.nombre} onChange={handleChange} />
                    <InputComponent Icon={CalendarIcon} error={state.errores.fecha} label="Fecha limite" type='date' name="fecha" placeholder="Fecha del proyecto" value={state.campos.fecha} onChange={handleChange} />
                </div>

                <InputComponent error={state.errores.descripcion} label="Descripcion" name="descripcion" placeholder="Descripcion del proyecto" type="textarea" value={state.campos.descripcion} onChange={handleChange} />
                <SeparatorComponent />
                <BuscadorComponent onSelectUser={handleSelectUser} />
                <p className="text-ui-text font-bold">Miembros:</p>
                <SeparatorComponent />
                {state.campos.miembros.length > 0 && (
                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                        {state.campos.miembros.map((miembro) => (
                            <div key={miembro.uid} className="flex items-center justify-between bg-ui-secondary border border-border-color rounded-md px-2 py-1">
                                <div className='flex items-center gap-2 text-ui-text'>
                                    <ImgComponent className='w-8 h-8 rounded-full' src={miembro.photoURL} alt={miembro.displayName} />
                                    <p>{miembro.displayName}</p>
                                    <p className='text-xs text-ui-text-secondary'>{miembro.email}</p>
                                </div>
                                <button type="button" onClick={() => dispatch({ type: 'change_field', payload: { name: 'miembros', value: state.campos.miembros.filter((m) => m.uid !== miembro.uid) } })}>
                                    <XMarkIcon className="h-4 w-4 text-ui-text-secondary" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <SeparatorComponent />
                <div className='flex justify-end gap-5'>
                    <div className='flex gap-5 w-full sm:w-1/2'>
                        <BotonComponent text="Cancelar" type="button" onClick={() => dispatch({ type: 'reset' })} />
                        <BotonComponent text="Crear Proyecto" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
}
