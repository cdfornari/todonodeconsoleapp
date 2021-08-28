const fs = require('fs');

const path = './db/tareas.json';

const guardarArchivo = (data) =>{
    fs.writeFileSync(path,JSON.stringify(data));
}

const leerDB = () => {

    if (!fs.existsSync(path)){
        return null;
    }

    const info = fs.readFileSync(path, {encoding: 'utf-8'});

    const data = JSON.parse(info);

    return data;
}

module.exports = {
    guardarArchivo,
    leerDB
}