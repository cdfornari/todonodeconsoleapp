require('colors');

const mostrarMenu = () =>{

    return new Promise((resolve => {
        console.log('========================='.green);
        console.log('  Seleccione una opción'.green);
        console.log('=========================\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Mostrar tareas`);
        console.log(`${'3.'.green} Mostrar tareas completadas`);
        console.log(`${'4.'.green} Mostrar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Seleccione una opción: ', (op)=>{
            readLine.close();
            resolve(op);
        });

    }));
    
}

const pausa = () =>{

    return new Promise(resolve =>{
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('\nPresione ENTER para continuar\n', (op)=>{
            readLine.close();
            resolve()
        });
    }) 
    
}

module.exports = {
    mostrarMenu,
    pausa
}