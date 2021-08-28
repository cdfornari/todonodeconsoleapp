require('colors');
const inquirer = require ('inquirer');

const {inquirerMenu,
    pausa,
    leerInput,
    seleccionarTareaBorrar,
    confirmar,
    seleccionarTareaCompletar
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');
const { guardarArchivo, leerDB } = require('./helpers/guardarArchivo');


const main = async()=>{

    let op = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        op = await inquirerMenu();

        switch (op) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listaCompleta();
            break;

            case '3':
                tareas.filtrarTareas(true);
            break;

            case '4':
                tareas.filtrarTareas(false);
            break;

            case '5':
                const ids = await seleccionarTareaCompletar(tareas.listaArr);
                tareas.toggleStatus(ids);
            break;

            case '6':
                const id = await seleccionarTareaBorrar(tareas.listaArr);
                if (id !== '0'){
                    const ok = await confirmar('Estás seguro que deseas borrar la tarea?');
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
            break;
        }

        guardarArchivo(tareas.listaArr);

        await pausa();

    } while (op !=='7');

}

main();