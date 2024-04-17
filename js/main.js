document.addEventListener('DOMContentLoaded', function() {
    try {
        const productos = [
            {"id": 1,"name": "Pernil de cerdo","price": 50000,"img": "./img/1pernilCerdo.png"},{"id": 2,"name": "Pernil de ternera","price": 60000,"img": "./img/2pernilTernera.png"},{"id": 3,"name": "Mesa Dulce", "price": 40000,"img": "./img/3mesaDulce.png"},{"id": 4,"name": "Mesa Dulce Especial","price": 45000,"img": "./img/4mesaDulceEspecial.png"},{"id": 5, "name": "Tortas 30 cm","price": 30000,"img": "./img/5tortas30cm.jpg"},{"id": 6,"name": "Tortas Temáticas","price": 35000,"img": "./img/6TortasTematicas.jpg"},{"id": 7,"name": "Tortas clásicas","price": 25000,"img": "./img/7TortasClasicas.jpg"},
            {"id": 8,"name": "Pizza-Party","price": 50000,"img": "./img/8servicioPizzaParty.png"},{"id": 9,"name": "Mesa Picada","price": 25000,"img": "./img/9MesaPicada.png"},{"id": 10,"name": "Miga mediterráneo","price": 1500,"img": "./img/10MigaMed.jpg"},{"id": 11,"name": "Croissant de JyQ","price": 1100,"img": "./img/11CroissantJQ.jpg"},{"id": 12,"name": "Langostinos","price": 2200,"img": "./img/12Langostinos.jpg"},{"id": 13,"name": "Bastones","price": 2000,"img": "./img/13Bastones.jpg"},{"id": 14,"name": "Volovanes","price": 2300,"img": "./img/14Volovan.jpg"},{"id": 15,"name": "Vasito Shot","price": 1800,"img": "./img/15vasitoShot.png"}
        ];

        const productosContainer = document.getElementById('products-container');
        const carritoLista = document.getElementById('carrito-lista');
        const totalElement = document.getElementById('total');
        const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
        const comprarBtn = document.getElementById('comprar-btn');
        const formulario = document.getElementById('formulario');

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        function mostrarProductos() {
            productosContainer.innerHTML = '';
            productos.forEach(function(producto) {
                const productoElement = document.createElement('div');
                productoElement.innerHTML = `
                    <div class="producto">
                        <img src="${producto.img}" alt="foto de ${producto.name}">
                        <p>${producto.name}</p>
                        <p>$${producto.price}</p>
                        <button class="agregar-carrito" data-id="${producto.id}">Agregar</button>
                    </div>
                `;
                productosContainer.appendChild(productoElement);
            });
        }

        function mostrarCarrito() {
            carritoLista.innerHTML = '';
            let total = 0;
            carrito.forEach(function(item) {
                const producto = productos.find(producto => producto.id === item.id);
                const carritoItem = document.createElement('li');
                carritoItem.innerHTML = `
                    ${producto.name} - $${producto.price} x ${item.cantidad}
                    <button class="eliminar-carrito" data-id="${producto.id}">Eliminar</button>
                `;
                carritoLista.appendChild(carritoItem);
                total += producto.price * item.cantidad;
            });
            totalElement.textContent = total;
        }

        function agregarAlCarrito(id) {
            const itemExistente = carrito.find(item => item.id === id);
            if (itemExistente) {
                itemExistente.cantidad++;
            } else {
                carrito.push({ id, cantidad: 1 });
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        function eliminarDelCarrito(id) {
            carrito = carrito.filter(item => item.id !== id);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        function vaciarCarrito() {
            carrito = [];
            localStorage.removeItem("carrito");
            mostrarCarrito();
        }

        function comprar() {
            formulario.style.display = 'block';
        }
        
        function mostrarMensajeCompraExitosa(nombre, apellido, direccion) {
            Swal.fire({
                icon: 'success',
                title: '¡Gracias por tu compra!',
                html: `Espero verte pronto, ${nombre} ${apellido}! <br> Tu pedido será enviado a ${direccion}.`,
                confirmButtonText: 'Aceptar'
            });
        }

        function mostrarMensajeError() {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor completa todos los campos del formulario.',
                confirmButtonText: 'Aceptar'
            });
        }

        document.getElementById('formulario-compra').addEventListener('submit', function(event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const direccion = document.getElementById('direccion').value;

            if (nombre && apellido && direccion) {
                mostrarMensajeCompraExitosa(nombre, apellido, direccion);
                vaciarCarrito();
            } else {
                mostrarMensajeError();
            }
        });

        productosContainer.addEventListener("click", function(event) {
            if (event.target.classList.contains("agregar-carrito")) {
                const id = parseInt(event.target.dataset.id);
                agregarAlCarrito(id);
            }
        });

        carritoLista.addEventListener("click", function(event) {
            if (event.target.classList.contains("eliminar-carrito")) {
                const id = parseInt(event.target.dataset.id);
                eliminarDelCarrito(id);
            }
        });

        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
        comprarBtn.addEventListener("click", comprar);

        mostrarProductos();
        mostrarCarrito();
    } 
    catch (error) {
        console.error(error);
    }
});
