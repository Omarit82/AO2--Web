/** Carga, lectura y actualización de las estadisticas*/

import { actualizarEstadisticas, actualizarPasajeros, cargaTabla } from "./actualizar.js";

export function statics(){
    /**Traigo la tabla y el msj del DOM */
    let tabla = document.getElementById("registeredTrips");
    let msg = document.getElementById("msgTableEmpty");
    /**Traigo INFO del localStorage y chequeo la visualización de la tabla */
    const info = JSON.parse(localStorage.getItem("info"));
    /**Chequeo el estado de la INFO**/
    /** Chequeo si la info no fue borrada*/
    if(info === null){
        tabla.classList.add("hide");
        msg.classList.remove("hide");
    }else{
        if(info.length === 0){
            tabla.classList.add("hide");
            msg.classList.remove("hide");
        }else{
            tabla.classList.remove("hide");
            msg.classList.add("hide");
            /**Hay info para cargar en la tabla */
            cargaTabla();
            actualizarEstadisticas();
            actualizarPasajeros();
        }
    }
   
}