class Carrito {
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.getAttribute('data-id'),
            cantidad: 1
        }

        if(productosLS == infoProducto.id){
            this.insertarCarrito(infoProducto);
        }
        
    }
    comprarProducto(i){
        if(i.target.classList.contains('agregar-carrito')){
            const producto = i.target.parentElement;
            this.leerDatosProducto(producto);
        }
    }
    
    insertarCarrito(producto){
        const agregarAlCarrito = document.createElement('tr');
        agregarAlCarrito.innerHTML = 
                            `<td>
                                <img src="${producto.imagen}" width=100>
                            </td>
                            <td>${producto.titulo}</td>
                            <td>${producto.precio}</td>
                            <td>
                                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                            </td>`;
        listaProductos.appendChild(agregarAlCarrito);
    }

    eliminarProducto(i){
        let producto;
        let productoID;
        if(i.target.classList.contains('borrar-producto')){
            i.target.parentElement.remove();
            producto = i.target.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProducto(productoID);
        this.calcularTotal();

    }

    guardarProductosLocalStorage(producto){
        let productos;
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLocalStorage(){
        let productoLS;
        if(localStorage.getItem('productos') == null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    leerLocalStorage(){
        let productosLS;
        productosLS.forEach(function (producto){
            const agregarLS = document.createElement('tr');
            agregarLS.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(ragregarLS);
        });
    }

    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, i){
            if(productoLS.id == productoID){
                productosLS.splice(i, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    procesarPedido(){
        if(this.obtenerProductosLocalStorage().length == 0){
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'El carrito está vacío',
            })
        }
    }

    calcularTotal(){
        let productosLS;
        let total = 0;
        let subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let subtotal = (productosLS[i].precio * productosLS[i].cantidad);
            total = total + subtotal;   
        }
        document.getElementById('subtotal').innerHTML = "$ " + subtotal;
        document.getElementById('total').value = "$" + total;
    }
}