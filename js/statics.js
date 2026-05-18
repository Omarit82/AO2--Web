/** El use strict elimina los errores silenciosos de javascript, prohibe cierta sintaxis - Buena practica*/
"use strict";
import { actualizarEstadisticas, actualizaTabla } from "./actualizarTabla.js";

 

/** Buena practica para asegurar que el Dom este completamente cargado antes de iniciar con el codigo **/ 
document.addEventListener("DOMContentLoaded", ()=>{
    /** Consulto el localStorage para completar la tabla **/
    let table = document.getElementById("registeredTrips");
    let message = document.getElementById("registered");

    const info = localStorage.getItem('info');

    if(info === null){
        table.classList.add("isEmpty");
        let msg = document.createElement("h4");
        msg.id="empty";
        msg.textContent="Aun no se registraron viajes";
        msg.classList.add("text-center");
        message.append(msg);
    } else{
        actualizaTabla();
        actualizarEstadisticas();
    }

});