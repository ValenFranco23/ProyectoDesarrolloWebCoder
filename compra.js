cargarEventos();

const compra = new Carrito();
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
    carrito.addEventListener('keyup', (i) => { compra.obtenerEvento(i) });
}

function procesarCompra() {
    if (compra.obtenerProductosLocalStorage().length == 0) {
        Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'No hay productos seleccionados',
            button: 'Aceptar'
        })
    }
    else if (cliente.value == '' & correo.value == '') {
        Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Ingrese su info',
        })
    }
}

