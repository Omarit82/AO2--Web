"use strict";

import { actualizarEstadisticas, actualizarPasajeros, cargaTabla } from "./actualizar.js";
import { statics } from "./statics.js";

let indice = null; /** Variable global para saber qué fila estamos editando */

export function funcionalidadBotones(){
    const swalBootstrap = Swal.mixin({
        customClass:{
            confirmButton: "btn btn-success me-2",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    /** Traigo la data del LocalStorage */
    const data = JSON.parse(localStorage.getItem("info")) || [];

    /** Traigo los componentes del DOM */
    let botonesEliminar = document.querySelectorAll(".eliminar");
    let botonesPagar = document.querySelectorAll(".pagar");
    let botonesEditar = document.querySelectorAll(".edit");
    let form = document.getElementById("newTrip");

    for(let i = 0; i < botonesEliminar.length; i++){
        const nuevoBoton = botonesEliminar[i].cloneNode(true);
        botonesEliminar[i].parentNode.replaceChild(nuevoBoton, botonesEliminar[i]);
        nuevoBoton.addEventListener("click", () => {
            swalBootstrap.fire({
                title: "¿Desea eliminar el registro?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if(result.isConfirmed){
                    data.splice(i, 1);
                    localStorage.setItem("info", JSON.stringify(data));
                    statics();
                    swalBootstrap.fire({
                        title: "Registro eliminado!",
                        icon: "success"
                    });
                }
            });
        });
    }
    for(let i = 0; i < botonesPagar.length; i++){
        const nuevoBoton = botonesPagar[i].cloneNode(true);
        botonesPagar[i].parentNode.replaceChild(nuevoBoton, botonesPagar[i]);
        nuevoBoton.addEventListener("click", () => {
            swalBootstrap.fire({
                title: "¿Confirma el Pago?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if(result.isConfirmed){
                    data[i].estado = "Cobrado";
                    localStorage.setItem("info", JSON.stringify(data));
                    statics();
                    swalBootstrap.fire({
                        title: "Viaje Cobrado!",
                        icon: "success"
                    });
                }
            });
        });
    }

    for(let i = 0; i < botonesEditar.length; i++){
        const nuevoBoton = botonesEditar[i].cloneNode(true);
        botonesEditar[i].parentNode.replaceChild(nuevoBoton, botonesEditar[i]);
        nuevoBoton.addEventListener("click", () => {
            indice = i;
            document.getElementById("submit").classList.add("hide");
            document.getElementById("resetear").classList.add("hide");
            document.getElementById("edit").classList.remove("hide");
            document.getElementById("cancel").classList.remove("hide");

            let cliente = data[i];
            form.elements["name"].value = cliente.name;
            form.elements["to"].value = cliente.to;
            form.elements["date"].value = cliente.date;
            form.elements["duration"].value = cliente.duration;
            form.elements["price"].value = cliente.price;
            form.elements["dni"].value = cliente.dni;
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const editBtnForm = document.getElementById("edit");
    const cancelBtnForm = document.getElementById("cancel");
    const form = document.getElementById("newTrip");

    if(editBtnForm) {
        editBtnForm.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            if (indice === null) return;
            const data = JSON.parse(localStorage.getItem("info")) || [];
            
            data[indice].name = form.elements["name"].value.toUpperCase();
            data[indice].to = form.elements["to"].value.toUpperCase();
            data[indice].date = form.elements["date"].value;
            data[indice].duration = form.elements["duration"].value;
            data[indice].price = form.elements["price"].value;
            data[indice].dni = form.elements["dni"].value;

            localStorage.setItem("info", JSON.stringify(data));
            
            indice = null;
            form.reset();
            document.getElementById("submit").classList.remove("hide");
            document.getElementById("resetear").classList.remove("hide");
            editBtnForm.classList.add("hide");
            cancelBtnForm.classList.add("hide");
            statics(); 
        });
    }

    if(cancelBtnForm) {
        cancelBtnForm.addEventListener("click", (e) => {
            e.preventDefault();
            indice = null;
            form.reset();
            document.getElementById("submit").classList.remove("hide");
            document.getElementById("resetear").classList.remove("hide");
            editBtnForm.classList.add("hide");
            cancelBtnForm.classList.add("hide");
        });
    }
});