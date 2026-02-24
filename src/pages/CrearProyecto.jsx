import React from 'react';
import InputComponent from '../components/formsComponents/InputComponent';
import SeparatorComponent from '../components/utilsComponents/SeparatorComponent';
export const CrearProyecto = () => {

    return (

        <div className="w-full flex-1 p-5">
            <div className='mb-5'>
                <h1 className="text-2xl font-bold text-ui-text">Crear Proyecto</h1>
            </div>
            <SeparatorComponent />
            <form className='flex flex-col gap-5 '>
                <div className='flex sm:flex-row w-full gap-5 flex-col'>
                    <InputComponent name="Nombre" placeholder="Nombre del proyecto" />
                    <InputComponent type='date' name="fecha" placeholder="Fecha del proyecto" />
                </div>

                <InputComponent label="Descripcion" name="Descripcion" placeholder="Descripcion del proyecto" type="textarea" />

            </form>
        </div>
    );
}
