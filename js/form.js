"use strict";

import { actualizarEstadisticas, actualizaTabla } from "./actualizarTabla.js";

document.addEventListener("DOMContentLoaded", () => {

    /** Escucho el submit del form para evitar el envio al backend **/
    let form = document.getElementById("newTrip");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();

        const formData = new FormData(form);
        /**Se deben validar los datos del form! */
        const data = Object.fromEntries(formData.entries());        
        /** traigo el objeto de localStorage*/
        const info = JSON.parse(localStorage.getItem("info"));

        if(info===null){
            const array = [data];
            localStorage.setItem('info',JSON.stringify(array));
            let table = document.getElementById("registeredTrips");
            table.classList.remove("isEmpty");
        }else{
            /**Limpio la tabla */
            let tabla = document.getElementById("tableBody");
            tabla.innerHTML="";
            info.push(data);
            localStorage.setItem('info',JSON.stringify(info));
        }
        actualizaTabla();
        actualizarEstadisticas()
        form.reset();
    })


})