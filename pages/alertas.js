const prodAgregado = document.getElementById("card-body");

Swal.fire({
    title: 'Bienvenidos a nuestra tienda',
    text: 'Acá podrás encotrar todo lo que necesitas en bedidas',
    imageUrl:'./imagenes/logoNuevo.png',
    footer: '<span class="importante">Ingresá solamente si sos mayor de 18 años</span>',
    confirmButtonText: 'Soy mayor de 18 años',
    allowOutsideClick: false,
})

prodAgregado.addEventListener("click", ()=>{     
    Swal.fire('Any fool can use a computer')
})


