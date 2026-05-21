"use strict";

import { actualizarEstadisticas, actualizarPasajeros, cargaTabla } from "./actualizar.js";
import { statics } from "./statics.js";

export function funcionalidadBotones(){
    const swalBootstrap = Swal.mixin({
        customClass:{
            confirmButton: "btn btn-success me-2",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    })
    /**Traigo la data del LocalStorage*/
    const data = JSON.parse(localStorage.getItem("info"));
    /**Traigo los botones eliminar del DOM */
    let botonesEliminar = document.querySelectorAll(".eliminar");
    /**Escucho los eventos de todos los botones eliminar*/
    for(let i=0;i<botonesEliminar.length;i++){
        botonesEliminar[i].addEventListener("click", () => {
            swalBootstrap.fire({
                title: "¿Desea eliminar el registro?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText:"Confirmar",
                cancelButtonText: "Cancel",
            }).then((result) =>{
            if(result.isConfirmed){
                data.splice(i,1);
                localStorage.setItem("info",JSON.stringify(data));
                statics();
                actualizarEstadisticas();
                actualizarPasajeros();
                swalBootstrap.fire({
                    title: "Registro eliminado!",
                    icon: "success"
                });
            }})
            
        })
    }
    /**Botones Pagar */
    let botonesPagar = document.querySelectorAll(".pagar");
    for(let i=0;i<botonesPagar.length;i++){
        botonesPagar[i].addEventListener("click", () => {
            swalBootstrap.fire({
                title: "¿Confirma el Pago?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText:"Confirmar",
                cancelButtonText: "Cancel",
            }).then((result) =>{
            if(result.isConfirmed){
                let viaje = data[i];
                let estado = document.getElementById("estado"+i);
                estado.innerHTML ="Cobrado";
                data[i].estado = "Cobrado";
                localStorage.setItem("info",JSON.stringify(data));
                statics();
                actualizarEstadisticas();
                actualizarPasajeros();
                swalBootstrap.fire({
                    title: "Viaje Cobrado!",
                    icon: "success"
                });
            }})
            
        })
    }
    /**BOTONES EDITAR */
    /**Tengo que cargar los datos del cliente en el form y cambiar el boton de crear por el de editar
     *  con el id del cliente que lo vincula al arreglo de info.
    */
    let botonesEditar = document.querySelectorAll(".edit");
    let form = document.getElementById("newTrip");
    for(let i=0;i<botonesEditar.length;i++){
        botonesEditar[i].addEventListener("click", () => {
            /**saco el submit y el borrar*/
            let submit = document.getElementById("submit");
            let resetear = document.getElementById("resetear");
            submit.classList.add("hide");
            resetear.classList.add("hide");
            /**muestro el edit y el cancelar*/
            let edit = document.getElementById("edit");
            let cancel = document.getElementById("cancel");
            edit.classList.remove("hide");
            cancel.classList.remove("hide");
            /**Muestro los datos actuales del cliente */
            let cliente = data[i];
            form.elements["name"].value =cliente.name;
            form.elements["to"].value=cliente.to;
            form.elements["date"].value=cliente.date;
            form.elements["duration"].value=cliente.duration;
            form.elements["price"].value=cliente.price;
            form.elements["dni"].value=cliente.dni;
            /**Editando -  traigo los nuevos valores*/
            edit.addEventListener("click",()=>{
                
                cliente.name=form.elements["name"].value;
                cliente.to=form.elements["to"].value;
                cliente.date=form.elements["date"].value;
                cliente.duration=form.elements["duration"].value;
                cliente.price=form.elements["price"].value;
                cliente.dni=form.elements["dni"].value;
                data[i] = cliente;
                console.log(data);
                
                localStorage.setItem("info",JSON.stringify(data));
                cargaTabla();                
                submit.classList.remove("hide");
                resetear.classList.remove("hide");
                edit.classList.add("hide");
                cancel.classList.add("hide");

                form.elements["name"].value = "";
                form.elements["to"].value="";
                form.elements["date"].value="";
                form.elements["duration"].value="";
                form.elements["price"].value="";
                form.elements["dni"].value="";                

            })
            
        })
    }
};