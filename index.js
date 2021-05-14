const dotenv = require('dotenv').config()

const { 
  leerInput, 
  inquirerMenu, 
  pausa, 
  listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {

//   const texto = await  leerInput('Hola: ');
const busquedas = new Busquedas(); 
  let  opt = '';

  do{

    opt =   await inquirerMenu();

    switch(opt){

        case 1:

        // Mostrar mensaje
        const termino = await  leerInput('Ciudad: ');
        //console.log( lugar );
      
        // Mostrar los lugares
        const lugares = await busquedas.ciudad( termino );

        // Selecionar Lugar
        const id = await listarLugares( lugares );

        if( id === '0') continue;

        const  { id: id_sel, nombre, lng, lat } = lugares.find( l => l.id === id);
        // Guardar DB
        busquedas.guardarHistorial(nombre)

        // clima 
        const { desc, min, max, temp } = await busquedas.climaLugar( lat, lng );

        // Mostrar resultados

        console.log( ' Informacion de la ciudad');

        console.log('Ciudad', nombre.green);
        console.log('Lat', lat);
        console.log('Lng', lng);
        console.log('Temperatura', temp);
        console.log('Minima', min);
        console.log('Maxima', max);
        console.log('desc', desc.green);

        break;

        case 2:
          busquedas.historial.forEach( (lugar, i ) => {
            const idx = `${ i + 1}`.green;
            console.log( `${ idx } ${ lugar }` )
          })
        break;
    }
            
            await pausa()

  }while(opt !== 0)

  


}

main();