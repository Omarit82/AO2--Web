"use strict";
/*Funcion de actualizacion de la tabla de viajes*/
export function actualizaTabla(){
    const tabla = document.getElementById("tableBody");
    /** Voy a actualizar la tabla con la informacion del Localstorage **/
    const info = JSON.parse(localStorage.getItem("info"));
    if(info.length !== 0){
        let message = document.getElementById("empty");
        if(message) {
            message.remove();
        }
    }
    for(let i=0;i<info.length;i++){
        let bloque = document.createElement("tr"); /**NUEVA FILA */
        let ciudad = document.createElement("td");
        ciudad.textContent=info[i].to;
        let fecha = document.createElement("td");
        fecha.textContent=info[i].date;
        let duracion = document.createElement("td");
        duracion.textContent=info[i].duration;
        let precio = document.createElement("td");
        precio.textContent="$ "+info[i].price;
        let importe = document.createElement("td");
        importe.textContent="$ "+parseFloat(info[i].duration)*parseFloat(info[i].price);
        let nombre = document.createElement("td");
        nombre.textContent=info[i].name;
        let dni = document.createElement("td");
        dni.textContent=info[i].dni;
        let estado = document.createElement("td");
        estado.textContent="A cobrar";
        let eliminar = document.createElement("button");
        eliminar.textContent="Eliminar";
        eliminar.classList.add("btn","btn-danger","eliminar");
        eliminar.id="eliminar"+i;
        let pagar = document.createElement("button");
        pagar.classList.add("btn","btn-info","me-2","pagar");
        pagar.id="pagar"+i;
        pagar.textContent="Pagar";
        let botones = document.createElement("td");
        botones.classList.add("d-flex");
        botones.appendChild(pagar);
        botones.appendChild(eliminar);
    
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
        console.log(resultado);
        /**Creo una un-order list **/
        const lista = document.createElement("ul");
        resultado.forEach(el => {
            let item = document.createElement("li");
            item.classList.add("text-start");
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
        console.log(resultado);
        /**Creo una un-order list **/
        const lista = document.createElement("ul");
        resultado.forEach(el => {
            let item = document.createElement("li");
            item.classList.add("text-start");
            item.textContent=el.to+" ("+el.date+") "+el.pax+" pasajero/s";
            lista.appendChild(item);
        });
        msg.appendChild(lista);
    }else{
        msg.textContent="Sin Datos"
    }
}