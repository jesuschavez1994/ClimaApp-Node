const fs = require('fs');
const axios = require('axios');

class Busquedas{

    historial = [];
    path = './db/dataBase.json';

    get ParamsMapbox(){
        return{
            'access_token': process.env.MAPBOX_KEY || '',
            'autocomplete': true,
            'limit': 5,
            'language': 'es'
        }
    }

    get ParamsClima(){
        return{
            appid: process.env.OPENWEATHER_KEY || '',
            units: 'metric',
            lang: 'es'
        }
    }

    constructor(){
        // leer DB si existe
        this.leerDB();
    }

    async ciudad( lugar= '' ){

        try{

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.ParamsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map( lugar => 
                ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
                })
            );

        }catch(error){
            return [];
        }

    }

    async climaLugar( lat, lon ){

        try{

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.ParamsClima, lat, lon }
            });

            const resp = await instance.get();

            const {main, weather }  = resp.data; 

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        }catch(error){

        }

    }

    guardarHistorial( lugar = '' ){

        // prevenir dupilcados
        const existe = this.historial.includes( lugar.toLocaleLowerCase());

        (existe) 
                ? function(){ return }() 
                : this.historial.unshift( lugar.toLocaleLowerCase() )

        // Grabar en DB
        this.guardarDb();

    }

    guardarDb(){
        const payload = { historial: this.historial }
        fs.writeFileSync(this.path, JSON.stringify( payload ))
    }

    leerDB(){

        if(!fs.existsSync(this.path)){
            return;
        }

        const info = fs.readFileSync(this.path, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.historial = data.historial;

    }

}

module.exports = Busquedas;