"use strict";

import { funcionalidadBotones } from "./botones.js";
/*Funcion de actualizacion de la tabla de viajes*/
export function cargaTabla(){
    const tabla = document.getElementById("tableBody");
    tabla.innerHTML="";
    /** Voy a actualizar la tabla con la informacion del Localstorage **/
    const info = JSON.parse(localStorage.getItem("info"));
    for(let i=0;i<info.length;i++){
        let bloque = document.createElement("tr"); /**NUEVA FILA */
        let ciudad = document.createElement("td");
        ciudad.classList.add("text-nowrap");
        ciudad.textContent=info[i].to;
        let fecha = document.createElement("td");
        fecha.classList.add("text-nowrap");
        let hoy = Date.now();
        if(Date.parse(info[i].date)-hoy < (15*24*60*60*1000)){
            fecha.classList.add("green");
        }else if((Date.parse(info[i].date)-hoy < (30*24*60*60*1000))&&(Date.parse(info[i].date)-hoy>=(15*24*60*60*1000))){
            fecha.classList.add("yellow");
        }else{
            fecha.classList.add("red");
        }
        fecha.textContent=info[i].date;
        let duracion = document.createElement("td");
        duracion.classList.add("text-nowrap");
        duracion.textContent=info[i].duration;
        let precio = document.createElement("td");
        precio.classList.add("text-nowrap");
        precio.textContent="$ "+(info[i].price);
        let importe = document.createElement("td");
        importe.classList.add("text-nowrap");
        importe.textContent="$ "+(parseFloat(info[i].duration)*parseFloat(info[i].price)).toFixed(2);
        let nombre = document.createElement("td");
        nombre.classList.add("text-nowrap");
        nombre.textContent=info[i].name;
        let dni = document.createElement("td");
        dni.classList.add("text-nowrap");
        dni.textContent=info[i].dni;
        let estado = document.createElement("td");
        estado.classList.add("text-nowrap");
        estado.textContent=info[i].estado;
        estado.id = "estado"+i;
        /**CREO LOS BOTONES CON ID ESPECIFICO A CADA UNO */
        let eliminar = document.createElement("button");
        eliminar.textContent="X";
        eliminar.classList.add("btn","btn-danger","eliminar");
        eliminar.id="eliminar"+i;
        let pagar = document.createElement("button");
        pagar.classList.add("btn","btn-info","me-2","pagar");
        pagar.id="pagar"+i;
        pagar.textContent="$";

        let edit = document.createElement("button");
        edit.classList.add("btn","btn-success","ms-2","edit");
        edit.id="edit"+i;
        edit.textContent="Edit";

        let botones = document.createElement("td");
        botones.classList.add("d-flex");
        botones.appendChild(pagar);
        botones.appendChild(eliminar);
        botones.appendChild(edit);
        botones.classList.add("botonera");
    
        bloque.appendChild(ciudad);
        bloque.appendChild(fecha);
        bloque.appendChild(duracion);
        bloque.appendChild(precio);
        bloque.appendChild(importe);
        bloque.appendChild(nombre);
        bloque.appendChild(dni);
        bloque.appendChild(estado);
        bloque.appendChild(botones);
        tabla.appendChild(bloque);
    }
    funcionalidadBotones();   
}

export function actualizarEstadisticas(){
    /**TRAIGO LOS DATOS DEL LOCALSTORAGE */
    const data = JSON.parse(localStorage.getItem("info"));    
    let msg = document.getElementById("msgTotal");
    if(data){
        msg.innerHTML="";
        const resultado = [];
        data.forEach(element => {
            /**busco el index de un elemento igual*/
            const index = resultado.findIndex( elem  => elem.to === element.to);
            if(index == -1){
                /**si el elemento aun no se cargo en el arreglo lo pusheo */
                element.total = element.price*element.duration;
                resultado.push(element);
            }else{
                /**el elemento ya se habia cargado en el arreglo, sumo el total. */
                resultado[index].total = (resultado[index].price*resultado[index].duration) + (element.price*element.duration); 
            }
        });
        /**Creo una un-order list **/
        const lista = document.createElement("ul");
        resultado.forEach(el => {
            let item = document.createElement("li");
            item.classList.add("text-start","fs-5");
            item.textContent=el.to+" $"+el.total;
            lista.appendChild(item);
        });
        msg.appendChild(lista);
    }else{
        msg.textContent="Sin Datos"
    }

}

export function actualizarPasajeros(){
    const data = JSON.parse(localStorage.getItem("info"));    
    let msg = document.getElementById("paxTotal");
    if(data){
        msg.innerHTML="";
        const resultado = [];
        data.forEach(element => {
            /**busco el index de un elemento igual(mismo destino-misma fecha)*/
            const index = resultado.findIndex( elem  => (elem.to === element.to)&&(elem.date === element.date));
            if(index == -1){
                /**si el elemento aun no se cargo en el arreglo lo pusheo */
                element.pax = 1;
                resultado.push(element);
            }else{
                /**el elemento ya se habia cargado en el arreglo, sumo uno. */
                resultado[index].pax = resultado[index].pax+1; 
            }
        });
        /**Creo una un-order list **/
        const lista = document.createElement("ul");
        resultado.forEach(el => {
            let item = document.createElement("li");
            item.classList.add("text-start","fs-5");
            item.textContent=el.to+" ("+el.date+") "+el.pax+" pasajero/s";
            lista.appendChild(item);
        });
        msg.appendChild(lista);
    }else{
        msg.textContent="Sin Datos"
    }
}