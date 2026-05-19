"use strict";

import { actualizarEstadisticas, actualizarPasajeros, actualizaTabla } from "./actualizarTabla.js";

document.addEventListener("DOMContentLoaded", () => {
    /**Traigo la data del LocalStorage*/
    const data = JSON.parse(localStorage.getItem("info"));
    /**Traigo los botones eliminar del DOM */
    let botonesEliminar = document.querySelectorAll(".eliminar");
    /**Escucho los eventos de todos los botones eliminar*/
     for(let i=0;i<botonesEliminar.length;i++){
        botonesEliminar[i].addEventListener("click", () => {
            data.splice(i,1);
            localStorage.setItem("info",JSON.stringify(data));
            let tabla = document.getElementById("registeredTrips");
            tabla.innerHTML="";
            actualizaTabla();
            actualizarEstadisticas();
            actualizarPasajeros();
        })
    }

});