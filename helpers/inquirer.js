const inquirer =    require('inquirer');
                    require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [

            {
                value: 1,
                name: `${'1'.green}. Buscar ciudad`
           },
            {
                value: 2,
                name: `${'2'.green}. Historial`
           },
            {
                 value: 0,
                 name: `${'0'.green}. Salir`              
            }

        ]
    }
]



const inquirerMenu = async() => {
    console.log('====================='.green);
    console.log('  Seleccione un Menú '.white);
    console.log('=====================\n'.green);

    const { opcion } = await inquirer.prompt( menuOptions );
    return opcion;
}

const pausa = async() => {

    const pausaOptions = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`,
        }
    ]
    await inquirer.prompt( pausaOptions );
}

const leerInput = async( message ) => {

    const questions = [

        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){

                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }else{
                    return true;
                }
            }
        }
    ];

    const { desc } = await inquirer.prompt(questions);
    return desc;

}

const listarLugares = async( lugar = [] ) => {

    const choices = lugar.map( (lugar, i) => {

        const idx = `${ i + 1 }.`.green

        return{
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }

    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );
    return id;

}

const confirmar = async( message ) =>{

    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt( questions );

    return ok
}


const MostrarListadosCheck = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${ i + 1 }.`.green

        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }

    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( preguntas );
    return ids;

}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    MostrarListadosCheck
}
