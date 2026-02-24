import React from 'react';
import InputComponent from '../components/formsComponents/InputComponent';
import SeparatorComponent from '../components/utilsComponents/SeparatorComponent';
import { useReducer } from 'react';
import { formReducer } from '../reducers/formReducer';
import { UserIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';
import * as z from "zod";
export const CrearProyecto = () => {

    const schema = z.object({
        nombre: z.string(),
        fecha: z.date(),
        descripcion: z.string()
    });

    const handleChange = (e) => {
        dispatch({ type: 'change_field', payload: { name: e.target.name, value: e.target.value } });
    }

    const initialState = {
        campos: {
            nombre: '',
            fecha: new Date(),
            descripcion: '',
        },
        errores: {
            nombre: '',
            fecha: '',
            descripcion: '',
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
                    <InputComponent Icon={UserIcon} label="Nombre" name="nombre" placeholder="Nombre del proyecto" value={state.campos.nombre} onChange={handleChange} />
                    <InputComponent Icon={CalendarIcon} label="Fecha" type='date' name="fecha" placeholder="Fecha del proyecto" value={state.campos.fecha} onChange={handleChange} />
                </div>

                <InputComponent label="Descripcion" name="descripcion" placeholder="Descripcion del proyecto" type="textarea" value={state.campos.descripcion} onChange={handleChange} />

            </form>
        </div>
    );
}
