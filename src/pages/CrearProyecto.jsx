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
import { getAuth } from "firebase/auth";
import { createProyect } from '../services/proyectService';




export const CrearProyecto = () => {
    const auth = getAuth();
    const schema = z.object({
        nombre: z.string().min(1, "Nombre es requerido"),
        fecha: z.date(),
        descripcion: z.string().min(1, "Descripcion es requerida"),
        miembros: z.array(z.any()).min(1, "Debe haber al menos un miembro")
    }).refine((data) => data.fecha >= new Date(), {
        message: "La fecha debe ser mayor a la fecha actual",
        path: ["fecha"],
    });

    const handleChange = (e) => {
        dispatch({ type: 'SET_ERRORS', payload: { ...state.errores, [e.target.name]: "" } });
        dispatch({ type: 'change_field', payload: { name: e.target.name, value: e.target.value } });
    }

    const handleSelectUser = (user) => {
        if (state.campos.miembros.find((m) => m.uid === user.uid)) return;
        dispatch({ type: 'SET_ERRORS', payload: { ...state.errores, miembros: "" } });
        dispatch({ type: 'change_field', payload: { name: 'miembros', value: [...state.campos.miembros, user] } });
    }

    const handleRemoveUser = (user) => {
        dispatch({ type: 'change_field', payload: { name: 'miembros', value: state.campos.miembros.filter((m) => m.uid !== user.uid) } });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errores = schema.safeParse(state.campos);
        if (!errores.success) {
            const newErrors = {};
            errores.error.issues.forEach(issue => {
                newErrors[issue.path[0]] = issue.message;
            });
            dispatch({ type: 'SET_ERRORS', payload: newErrors });
            return;
        }
        dispatch({ type: 'SET_ERRORS', payload: initialState.errores });
        createProyect(state.campos, auth.currentUser);
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
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 '>
                <div className='flex sm:flex-row w-full gap-5 flex-col'>
                    <InputComponent Icon={FolderIcon} error={state.errores.nombre} label="Nombre" name="nombre" placeholder="Nombre del proyecto" value={state.campos.nombre} onChange={handleChange} />
                    <InputComponent Icon={CalendarIcon} error={state.errores.fecha} label="Fecha limite" type='date' name="fecha" placeholder="Fecha del proyecto" value={state.campos.fecha} onChange={handleChange} />
                </div>

                <InputComponent error={state.errores.descripcion} label="Descripcion" name="descripcion" placeholder="Descripcion del proyecto" type="textarea" value={state.campos.descripcion} onChange={handleChange} />
                <SeparatorComponent />
                <BuscadorComponent error={state.errores.miembros} onSelectUser={handleSelectUser} />
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
                                <button type="button" onClick={() => handleRemoveUser(miembro)}>
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
