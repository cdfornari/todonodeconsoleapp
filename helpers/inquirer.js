const inquirer = require ('inquirer');
colors = require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Seleccione una opción',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Mostrar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Mostrar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Mostrar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '7',
                name: `${'7.'.green} Salir\n`
            }
        ]
    }
];

const pauseInput = [
    {
        type: 'input',
        name: 'userinput',
        message: '\nPresione ENTER para continuar\n',
    }
]

const inquirerMenu = async ()=>{
    console.clear();
    console.log('========================='.green);
    console.log('           MENU'.green);
    console.log('=========================\n'.green);

    const {option} = await inquirer.prompt(menuOpts);


    return option;
}

const pausa = async()=>{
    const {userinput} = await inquirer.prompt(pauseInput);

    return userinput;

}


const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Ingresa un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const seleccionarTareaBorrar = async(tareas = [])=>{
    const choices = tareas.map((tarea,i) =>{
        const idx = i + 1;
        return {
            value: tarea.id,
            name: `${colors.green(idx)} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione tarea a borrar',
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(questions);

    return id;
}

const seleccionarTareaCompletar = async(tareas = [])=>{

    const choices = tareas.map((tarea,i) =>{
        const idx = i + 1;
        return {
            value: tarea.id,
            name: `${colors.green(idx)} ${tarea.desc}`,
            checked: (tarea.fechaCompletado)? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione tarea a borrar',
            choices
        }
    ]
    
    const {ids} = await inquirer.prompt(questions);

    return ids;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);

    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    seleccionarTareaBorrar,
    confirmar,
    seleccionarTareaCompletar
}