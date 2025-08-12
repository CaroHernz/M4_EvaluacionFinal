const productos = [
    { id: 1, imagen: './assets/images/product1.jpeg', nombre: "Robot Aspirador X300", descripcion: "Aspiradora inteligente con mapeo láser y app control. Ideal para pisos de hasta 120m².", precio: 249990 },
    { id: 2, imagen: './assets/images/product2.jpeg', nombre: "Airfryer Digital 5L", descripcion: "Freidora de aire con 8 programas preestablecidos y tecnología 360° para cocción uniforme.", precio: 89990 },
    { id: 3, imagen: './assets/images/product3.jpeg', nombre: "Smartwatch Deportivo Pro", descripcion: "Monitor de ritmo cardíaco, GPS integrado y resistencia al agua 50m. Batería de 7 días.", precio: 129990 },
    { id: 4, imagen: './assets/images/product4.jpeg', nombre: "Parlante Bluetooth XSound", descripcion: "Sonido 360° con 20W de potencia. Resistente al agua IPX7 y batería de 15 horas.", precio: 59990 },
    { id: 5, imagen: './assets/images/product5.jpeg', nombre: "Kit Limpieza para Robot", descripcion: "Incluye 6 paños de microfibra, 2 cepillos y solución limpiadora compatible con marcas principales.", precio: 19990 },
    { id: 6, imagen: './assets/images/product6.jpeg', nombre: "Cargador Inalámbrico 3en1", descripcion: "Carga tu smartphone, reloj y audífonos simultáneamente. Potencia 15W.", precio: 34990 },
    { id: 7, imagen: './assets/images/product7.jpeg', nombre: "Laptop UltraSlim i7", descripcion: "Pantalla de 14' FHD, 16GB RAM, SSD 512GB, Intel Iris Xe. Solo 1.2kg de peso.", precio: 899990 },
    { id: 8, imagen: './assets/images/product8.jpeg', nombre: "Robot Cocina 12 en 1", descripcion: "Amasa, cocina al vapor, fríe y más. Pantalla táctil y 50 recetas preprogramadas.", precio: 249990 },
    { id: 9, imagen: './assets/images/product9.jpeg', nombre: "Monitor Gamer 32' 4K", descripcion: "144Hz, 1ms, HDR600, AMD FreeSync Premium. Incluye soporte ajustable.", precio: 459990 },
    { id: 10, imagen: './assets/images/product10.jpeg', nombre: "Cafetera Smart WiFi", descripcion: "Prepara café desde tu app. Molinillo integrado y 6 perfiles de bebidas.", precio: 179990 },
    { id: 11, imagen: './assets/images/product11.jpeg', nombre: "SSD Externo 2TB USB-C", descripcion: "1050MB/s, resistente a golpes y agua. Ideal para gamers y creadores de contenido.", precio: 89990 },
    { id: 12, imagen: './assets/images/product12.jpeg', nombre: "Mouse Gaming Pro RGB", descripcion: "16.000 DPI, 8 botones programables, iluminación RGB personalizable y diseño ergonómico para gaming prolongado.", precio: 49990 }
];
  
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let carritoItems = null;

const carritoSummary = document.getElementById('carrito-summary');
const productList = document.getElementById('catalogo_productos');

// Bienvenida al sitio web
const bienvenida = document.getElementById("bienvenida");
if (bienvenida) {
    if (localStorage.getItem("user")) {
        const user = localStorage.getItem("user");
        bienvenida.innerHTML = `Bienvenido ${user} a nuestra tienda digital.`;
    }
    else {
        const user = prompt("Ingrese su nombre y apellido.");
        bienvenida.innerHTML = `Bienvenido ${user} a nuestra tienda digital.`;
        localStorage.setItem("user", user);
    }
    
}
//Productos en Novedades
const novProductos = document.getElementById('novedades_productos');

function novedadesProductos(productos){
  const novProductos = document.getElementById('novedades_productos');
  
  if (!novProductos) {
      console.error('No se encontró #novedades_productos');
      return;
    }
  
    if (novProductos) {
      novProductos.innerHTML = '';
      const ultimosProductos = productos.slice(-3);
      ultimosProductos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-sm-12 col-md-4 mb-4';
        col.innerHTML = `
                  <div class="card h-100">
                      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                      <div class="card-body">
                          <h5 class="card-title">${producto.nombre}</h5>
                          <p class="card-text">${producto.descripcion}</p>
                          
                      </div>
                      <div class="card-footer bg-white border-0">
                          <h4 class="text-primary mt-3">$${producto.precio.toLocaleString('es-CL')}</h4>
                          
                          <div class="d-flex justify-content-end align-items-center">
                          <a href="productos.html?id=${producto.id}" class="btn btn-outline-primary">Ver más...</a>
                            </div>
                        </div>
                  </div>
              `;
        novProductos.appendChild(col);        
      });
    }
  };
novedadesProductos(productos);

// Card para Productos
function mostrarProductos(productos){
  const productList = document.getElementById('catalogo_productos');
  carritoItems = document.getElementById('carrito-items')
  
  if (!productList) {
      console.error('No se encontró #catalogo_productos');
      return;
    }
  
    if (!carritoItems) {
      console.error('No se encontró #carrito-items');
      return;
    }
    if (productList) {
      productList.innerHTML = '';
      productos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-sm-12 col-md-4 mb-4';
        col.innerHTML = `
                  <div class="card h-100">
                      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                      <div class="card-body">
                          <h5 class="card-title">${producto.nombre}</h5>
                          <p class="card-text">${producto.descripcion}</p>
                          
                      </div>
                      <div class="card-footer bg-white border-0">
                          <h4 class="text-primary mt-3">$${producto.precio.toLocaleString('es-CL')}</h4>
                          
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="input-group" style="width: 9.7rem;">
                              <button class="btn btn-outline-secondary minus-btn" type="button">-</button>
                              <input type="number" class="form-control text-center quantity-input" id="cinput-${producto.id}" value="0" min="0" step="1">
                              <button class="btn btn-outline-secondary plus-btn" type="button">+</button>
                            </div>
                            <button type="button" class="btn btn-primary" onclick="agregaCarrito('${producto.id}')" data-id="${producto.id}" data-toggle="tooltip" data-placement="top" title="Añadir al carrito">Agregar</button>
                            </div>
                        </div>
                  </div>
              `;
        productList.appendChild(col);

        // Selecciona todos los grupos de cantidad dentro de este producto
        col.querySelectorAll('.input-group').forEach(function(group) {
          const minusBtn = group.querySelector('.minus-btn');
          const plusBtn = group.querySelector('.plus-btn');
          const input = group.querySelector('.quantity-input');

          minusBtn.addEventListener('click', function() {
            const step = (input.step && input.step !== 'any') ? Number(input.step) : 1;
            const min = input.min !== '' ? Number(input.min) : 0;
            const current = isFinite(Number(input.value)) ? Number(input.value) : 0;
            const next = Math.max(min, current - step);
            input.value = next;
            validarDecimalPositivo(input);
          });

          plusBtn.addEventListener('click', function() {
            const step = (input.step && input.step !== 'any') ? Number(input.step) : 1;
            const current = isFinite(Number(input.value)) ? Number(input.value) : 0;
            input.value = current + step;
            validarDecimalPositivo(input);
          });
        });
      });
    }
  };
// Validar input de cantidad para que no se pueda ingresar un numero negativo u otro caracter
function validarDecimalPositivo(inputEl) {
  const valor = String(inputEl.value).replace(',', '.').trim();
  const num = Number(valor);
  const minValue = inputEl.min !== '' ? Number(inputEl.min) : 0;
  const esEntero = Number.isInteger(num);
  const esValido = valor !== '' && isFinite(num) && esEntero && num >= minValue;
  inputEl.classList.toggle('is-invalid', !esValido);
  return esValido;
}

// Validar mientras se escribe y al salir del campo
document.addEventListener('input', (e) => {
  if (e.target.matches('.quantity-input')) validarDecimalPositivo(e.target);
});
document.addEventListener('blur', (e) => {
  if (e.target.matches('.quantity-input')) validarDecimalPositivo(e.target);
}, true);

mostrarProductos(productos);

//filtro
const filtroProductos = document.getElementById("filtroProductos");
if (filtroProductos) {
    filtroProductos.addEventListener("input", (e) => {
        const productosFiltrados = productos.filter(producto => {
            return producto.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        });
        mostrarProductos(productosFiltrados);
    });
}

//tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
return new bootstrap.Tooltip(tooltipTriggerEl)
})

// offcanvas
const btnCarrito = document.getElementById("btnCarrito");
const offcanvascarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));
btnCarrito.addEventListener("click", () => {
    offcanvascarrito.toggle();
});

// Carrito
function agregaCarrito(productId) {
  const cantidadProducto = document.getElementById(`cinput-${productId}`);
  if (!cantidadProducto) {
    console.error(`Input cinput-${productId} no encontrado`);
    return;
  }

  const valor = String(cantidadProducto.value).replace(',', '.').trim();
  const cantidad = Number(valor);

  if (!isFinite(cantidad) || !Number.isInteger(cantidad) || cantidad < 1) {
    cantidadProducto.classList.add('is-invalid');
    cantidadProducto.focus();
    return;
  }

  cantidadProducto.classList.remove('is-invalid');

  // Lógica mínima de agregado (no solicitada, pero útil): sumar al carrito en memoria
  const producto = productos.find(p => String(p.id) === String(productId));
  if (!producto) return;

  const existente = carrito.find(item => String(item.id )=== String(productId));
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  // Reiniciar el input después de agregar (opcional)
  cantidadProducto.value = '0';

  renderCarrito();

  mostrarNotificacion(`¡${cantidad} ${producto.nombre} agregado(s) al carrito!`);
}
function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement('div');
  notificacion.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x m-3';
  notificacion.style.zIndex = '1000';
  notificacion.textContent = mensaje;
  document.body.appendChild(notificacion);
  
  setTimeout(() => {
    notificacion.classList.add('fade-out');
    setTimeout(() => notificacion.remove(), 500);
  }, 2500);
}


function cambiarCantidad(id,delta) {
  const input = document.getElementById(`cinput-${id}`);
  if (!input) return;
  let valor = parseInt(input.value) + delta;
  if (valor < 1) valor = 1;
  input.value = valor;
};

function renderCarrito(){
  const seccionCarrito = document.getElementById('seccion-carrito')
  const tabla = document.getElementById('tabla-carrito');
  const tbody = tabla.querySelector('tbody');
  const contadorCarrito = document.getElementById('contador-carrito');

  if (!tabla) {
    console.error('Tabla del carrito no encontrada');
    return;
  }

  tbody.innerHTML = '';

  if (carrito.length === 0) {
    seccionCarrito.style.display = 'none';
    document.getElementById('mensaje-carrito-vacio').style.display = 'block';
    return;
  } else {
    seccionCarrito.style.display = 'block';
    document.getElementById('mensaje-carrito-vacio').style.display = 'none';
  }

  carrito.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${item.id}</td>
        <td class="text-center">${item.cantidad}</td>
        <td>${item.nombre}</td>
        <td>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
        <td><button class="btn btn-danger" onclick="eliminarDelCarrito('${item.id}')"><i class="fa-solid fa-trash text-white"></i></button></td>
      `;
    tbody.appendChild(tr);
  });
  // Totalizador
  const neto = carrito.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
  const iva = Math.trunc(neto * 0.19);
  let bruto = neto + iva;
  const despacho = bruto < 100000 ? Math.trunc(bruto * 0.05) : 0;
  bruto += despacho;

  carritoSummary.innerHTML = `<p><strong>Valor Neto:</strong> $${neto.toLocaleString('es-CL')}</p>
                            <p><strong>IVA 19%:</strong> $${iva.toLocaleString('es-CL')}</p>
            ${despacho > 0 ? `<p><strong>Despacho:</strong> $${despacho.toLocaleString('es-CL')}</p>` : '<p><strong>Despacho: ¡Envío gratis!</strong></p>'}
                            <p><strong>Valor Bruto:</strong> $${bruto.toLocaleString('es-CL')}</p>
                            <div class="d-flex justify-content-around">
                            <button type="button" class="btn btn-danger mb-5" onclick="vaciarCarrito()">Vaciar Carrito</button>
                            <button type="button" class="btn btn-success mb-5" data-bs-toggle="modal" data-bs-target="#finalizarModal">Finalizar Compra</button>
                            </div>`

  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('resumenCompra', JSON.stringify({
    neto,iva,bruto,despacho
  }));

  //Contador carrito
  const itemsCarrito = carrito.reduce((sum, item) => sum + item.cantidad,0);
  if (contadorCarrito) {
    if (itemsCarrito > 0) {
      contadorCarrito.textContent = itemsCarrito;
      contadorCarrito.style.display = 'flex';
      if (itemsCarrito > 99){
        contadorCarrito.textContent = '99+';
      };
    }
    else {
      contadorCarrito.style.display = 'none'
    }
  }

}

function eliminarDelCarrito(productId) {
  const idProducto = Number(productId);
  const index = carrito.findIndex(item => item.id === idProducto);
  if (index !== -1) {
    carrito.splice(index, 1);
    renderCarrito();
  }
};
renderCarrito();

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem('carrito');
  localStorage.removeItem('resumenCompra');
  renderCarrito();
}
