//declaracion de variables
let nombrePro = document.querySelector(".nombre-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let precioPro = document.querySelector(".precio-producto");
let imagenPro = document.querySelector(".imagen-producto");
let btnGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table > tbody")
let campoBuscar = document.querySelector("#buscador");
let btn_buscar = document.querySelector(".btn-buscar");

document.addEventListener("DOMContentLoaded", function () {
    borrarTabla();
    mostrarDatos();
});

//agregar evento al boton
btnGuardar.addEventListener("click", function() {
   let objeto = validarProductos();
   if (objeto) {
       guardarProductos(objeto);
       borrarTabla();
       mostrarDatos();
   }
});

//funcion para validar los productos del formulario
function validarProductos() {
    let producto;
    if( nombrePro.value == "" || presentacionPro.value == "" || 
        precioPro.value == "" || imagenPro.value == ""
    ){
        alert("Todos los campos son obligatorios");
        return null;
    }

    producto = {
        nombre: nombrePro.value,
        presentacion: presentacionPro.value,
        precio: precioPro.value,
        imagen: imagenPro.value
    };

    nombrePro.value = "";
    presentacionPro.value = "";
    precioPro.value = "";
    imagenPro.value = "";
    return producto;
}

const listaPedidos = "Pedidos"

function guardarProductos(objeto) {
    let nuevosProductos = [];

    let productosGuardados = JSON.parse(localStorage.getItem(listaPedidos));

    if (productosGuardados != null) {
        nuevosProductos = productosGuardados;
    }

    nuevosProductos.push(objeto);

    localStorage.setItem( listaPedidos, JSON.stringify(nuevosProductos));
    alert("Datos Guardados");
}

function mostrarDatos() {
    let nuevosProductos = []

    let productosGuardados = JSON.parse(localStorage.getItem(listaPedidos));

    if (productosGuardados != null) {
        nuevosProductos = productosGuardados;
    }

    nuevosProductos.forEach((np,i) => {
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${np.nombre} </td>
            <td> ${np.presentacion} </td>
            <td> ${np.precio} </td>
            <td> <img src ="${np.imagen}" width="50%">  </td>
            <td>
                <span class="btn-editar btn btn-warning">✏️</span>  
            </td>
            <td>
                <span class="btn-eliminar btn btn-danger">✖️</span>
            </td>
        `;

        tabla.appendChild(fila)
    });
}

function borrarTabla() {
    let filas = document.querySelectorAll(".table tbody tr");
    filas.forEach((f)=>{
        f.remove();
    })
}


function buscarProducto() {
        let textoBusqueda = campoBuscar.value.toLowerCase();
        let productos = JSON.parse(localStorage.getItem(listaPedidos)) || [];
    
        borrarTabla();
    
        let productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(textoBusqueda) ||
            producto.presentacion.toLowerCase().includes(textoBusqueda) ||
            producto.precio.toLowerCase().includes(textoBusqueda)
        );
    
        productosFiltrados.forEach((producto, i) => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${i + 1}</td>
                <td>${producto.nombre}</td>
                <td>${producto.presentacion}</td>
                <td>${producto.precio}</td>
                <td><img src="${producto.imagen}" width="50%"></td>
                <td><span class="btn-editar btn btn-warning">✏️</span></td>
                <td><span class="btn-eliminar btn btn-danger">✖️</span></td>
            `;
            tabla.appendChild(fila);
        });
}

btn_buscar.addEventListener("click", function () {
    buscarProducto();
});

