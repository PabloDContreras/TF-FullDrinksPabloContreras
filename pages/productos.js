const contenedor = document.querySelector(".containerProd");
const verCarrito = document.getElementById("verCarrito");
const parte1 = document.getElementById("ventanaCompra");
const sumarProducto = document.getElementById("qTotal");
const cerrarVenta = document.getElementById("terminarCompra");

//CREACION DE CARTAS DE PUBLICACIÓN
const tarjetas = async()=>{
    const Response = await fetch("./stockProductos.json")
    const informacion = await Response.json()

    informacion.forEach((publicacion, indice) =>{
        const info = document.createElement("info")
        info.innerHTML = `
        <div class="card" style="width: 28rem;">
            <img src="${publicacion.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${publicacion.nombre}</h5>
            <p class="card-text">${publicacion.desc}</p>
            <p class="card-text">$${publicacion.valor}</p>
            <a type="button" class="btn agregarProducto" onClick="MostrarCarrito(${indice}")>Agregar al Carrito</a>  
            </div>
        </div>
        `;
let alarmaAgregar = info.querySelector(".btn");
alarmaAgregar.addEventListener("click", ()=>{     
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado',
        showConfirmButton: false,
        timer: 1500
    })
});
        contenedor.append(info);

        info.addEventListener("click", ()=>{
            const existe = carritoConProductos.some((botellaRepetida) => botellaRepetida.id === publicacion.id);
            if (existe){
                carritoConProductos.map((botellita) =>{
                    if(botellita.id === publicacion.id){
                        botellita.cantidad ++;
                    }
                });
            }else {
        carritoConProductos.push({
                id: publicacion.id, nombre: publicacion.nombre, desc: publicacion.desc, valor: publicacion.valor, imagen: publicacion.imagen, cantidad:publicacion.cantidad});
                guardarInfo();
            }
        });
    });
}
tarjetas();

//ASIGNACIÓN DE ELEMENTOS AL CARRO
const queCompras = () =>{
    parte1.style.display ="block";
    const prodAgregado = document.createElement("div");
    parte1.innerHTML="";
    prodAgregado.className = "styleTitulo";
    prodAgregado.innerHTML =`
    <h1 class= "styleTitulo">Tus productos seleccionados</h1>
    `;
    parte1.append(prodAgregado);
    const cerrarVentana =document.createElement("div");
    cerrarVentana.innerText = "❌";
    cerrarVentana.className = "styleBoton";
    
    cerrarVentana.addEventListener("click", ()=>{
        parte1.style.display= "none";
    });
    parte1.append(cerrarVentana);


    carritoConProductos.forEach((botellas)=>{
        let productosElegidos = document.createElement("div");
        productosElegidos.className = "styleCarro";
        productosElegidos.innerHTML =`
        <img src="${botellas.imagen}" class= "imagenVentana">
        <span class= "precioVentana1"><i class="fa-sharp fa-solid fa-circle-minus fa-flip fa-xs" style="color: #cf04cf;"></i></span>
        <h5 class= "precioVentana0">${botellas.cantidad}</h5>
        <span class= "precioVentana2"><i class="fa-solid fa-circle-plus fa-flip fa-xs" style="color: #cf04cf;"></i></span>
        <h5 class= "nombreVentana">${botellas.nombre}</h5>
        <h5 class= "precioVentana">$${botellas.valor}</h5>
        `;
        parte1.append(productosElegidos);

        let alarmaResta =productosElegidos.querySelector(".precioVentana1");

        alarmaResta.addEventListener("click", ()=>{
            if(botellas.cantidad !==1){
            botellas.cantidad-1;
        }
            queCompras();
            guardarInfo();
        });
        let alarmaSuma =productosElegidos.querySelector(".precioVentana2");
        alarmaSuma.addEventListener("click", ()=>{
            if(botellas.cantidad !==1){
            botellas.cantidad+1;
        }
            queCompras();
            guardarInfo();
        });          

        let quitar = document.createElement("span");
        quitar.innerText= "Quitar";
        quitar.className="quitarProducto";
        productosElegidos.append(quitar);
        quitar.addEventListener("click", sacarProductoDelCarrito); 
});

const total = carritoConProductos.reduce((acc, el)=> acc + el.valor * el.cantidad, 0);
const totalCompra = document.createElement("div");
    totalCompra.className = "totalCompra";
    totalCompra.innerHTML =`
    total de tu compra: $${total};
    `;
    parte1.append(totalCompra);
    
};

cerrarVenta.addEventListener('click', () => {
    window.location.href = '../index.html';
});

verCarrito.addEventListener("click", queCompras);

const sacarProductoDelCarrito =() =>{
    const fuera = carritoConProductos.find((elem) => elem.id);
    carritoConProductos = carritoConProductos.filter((fueraElemento) =>{
        return fueraElemento !== fuera;
    });
    queCompras();
    guardarInfo();
    };

let carritoConProductos = [];

//FORMULARIO
const guardarInfo = ()=>{
    localStorage.setItem("carritoConProductos",JSON.stringify(carritoConProductos));
};
JSON.parse(localStorage.getItem("carritoConProductos"));