const colors = require('colors');
const Tarea = require("./tarea");

class Tareas {

    get listaArr(){

        const arrTareas = [];
        Object.keys(this.lista).forEach(key => {
            const tarea = this.lista[key];
            arrTareas.push(tarea)
        })

        return arrTareas;
    }

    constructor(){
        this.lista = {};
    }

    borrarTarea(id=''){
        if (this.lista[id]){
            delete this.lista[id];
        }
    }

    cargarTareasFromArray (tareas = []){

        tareas.forEach(tareaDb =>{
            this.lista[tareaDb.id] = tareaDb;
        })

    }

    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this.lista[tarea.id] = tarea;
    }

    listaCompleta(){
        console.log();
        this.listaArr.forEach((tarea,i) => {
            const status = (tarea.fechaCompletado)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${colors.green(i+1)+'.'.green} :: ${tarea.desc} | ${status}`);
        })
    }

    filtrarTareas(completadas=true){
        let cont = 1;
        if (completadas){
            this.listaArr.forEach((tarea) => {
                if (tarea.fechaCompletado){
                    console.log(`${colors.green(cont)+'.'.green} :: ${tarea.desc} | ${'Completada en:'.green} ${tarea.fechaCompletado.green}`);
                    cont++;
                }
            })
        }else{
            this.listaArr.forEach((tarea) => {
                if (!tarea.fechaCompletado){
                    console.log(`${colors.green(cont)+'.'.green} :: ${tarea.desc} | ${'Pendiente'.red}`);
                    cont++;
                }
            })
        }
    }

    toggleStatus(ids=[]){
        ids.forEach(id =>{
            const tarea = this.lista[id];
            if (!tarea.fechaCompletado){
                tarea.fechaCompletado = new Date().toISOString();
            }
        });

        this.listaArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this.lista[tarea.id].fechaCompletado = null;
            }
        })
    }
}

module.exports = Tareas;