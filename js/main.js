"use strict";

import { statics } from "./statics.js";

document.addEventListener("DOMContentLoaded", () => {
    /**Inicialmente leo las estadisticas para cargar**/
    statics();
    /**Cargo una validación al date con JS. */
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth()+1).padStart(2,'0');
    const day = String(today.getDate()).padStart(2,'0');

    const dateToday = `${year}-${month}-${day}`;
    const fechaPartida = document.getElementById('fechaPartida').min=dateToday; 
})