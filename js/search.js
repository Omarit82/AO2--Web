"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /**Traigo el campo search */
    let input = document.getElementById("search");
    input.addEventListener("input", (e) => {
        
        let info = JSON.parse(localStorage.getItem("info"));
        let campo = document.getElementById("results");
        if(e.srcElement.value!=""){
            campo.innerHTML="";
            let founded = info.filter(item => item.name.includes(e.srcElement.value.toUpperCase()) || item.to.includes(e.srcElement.value.toUpperCase())); 
            if(founded.length === 0){
                campo.innerHTML="..Sin resultados..";
            }else{
                for (let i=0; i<founded.length;i++ ){
                    let fila = document.createElement("p");
                    fila.textContent=`${founded[i].name} - ${founded[i].to} - Fecha de viaje: ${founded[i].date}`;
                    campo.appendChild(fila);
                }
            }
            
            campo.classList.remove("hide");
        }else{
            campo.classList.add("hide");
        }
        
    })
});