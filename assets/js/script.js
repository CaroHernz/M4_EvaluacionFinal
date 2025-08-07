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
  
let carrito = [];
let carritoItems = null;

const carritoSummary = document.getElementById('carrito-summary');

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
                              <input type="number" class="form-control text-center quantity-input" id="cinput-${producto.id}" value="1" min="1">
                              <button class="btn btn-outline-secondary plus-btn" type="button">+</button>
                            </div>
                            <button class="btn btn-primary" onclick="agregaCarrito('${producto.id}')" data-id="${producto.id}">Agregar</button>
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
            let value = parseInt(input.value, 10);
            if (value > parseInt(input.min, 10)) {
              input.value = value - 1;
            }
          });

          plusBtn.addEventListener('click', function() {
            let value = parseInt(input.value, 10);
            input.value = value + 1;
          });
        });
      });
    }
  };
mostrarProductos(productos);

// offcanvas
const btnCarrito = document.getElementById("btnCarrito");
const offcanvascarrito = new bootstrap.Offcanvas(document.getElementById("offcanvasCarrito"));
btnCarrito.addEventListener("click", () => {
    offcanvascarrito.toggle();
});
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


  