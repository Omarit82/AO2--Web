"use strict";

import { statics } from "./statics.js";

document.addEventListener("DOMContentLoaded", () => {
    /** Escucho el submit del form para evitar el envio al backend **/
    let form = document.getElementById("newTrip");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        /**Se deben validar los datos del form! */
        const data = Object.fromEntries(formData.entries());  
        const swalBootstrap = Swal.mixin({
            customClass:{
                confirmButton: "btn btn-success me-2",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        })
        swalBootstrap.fire({
            title: "¿Confirma la carga?",
            text: "Resumen: "+data.name+" - "+data.to+"\n"+"Fecha: "+data.date,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText:"Confirmar",
            cancelButtonText: "Cancel",
        }).then((result) =>{
            if(result.isConfirmed){
                data.estado = "A cobrar";  
                data.name = data.name.toUpperCase();
                data.to = data.to.toUpperCase();    
                /** traigo el objeto de localStorage*/
                const info = JSON.parse(localStorage.getItem("info"));

                if((info===null)){ /**Si info no existe- lo creo y cargo la data. */
                    const array = [data];
                    localStorage.setItem('info',JSON.stringify(array));
                }else{
                    info.push(data);
                    localStorage.setItem('info',JSON.stringify(info));
                }
                form.reset();
                statics();
                
                
                swalBootstrap.fire({
                    title: "Cargado!",
                    icon: "success"
                });
            } 
        })
        
    })

})