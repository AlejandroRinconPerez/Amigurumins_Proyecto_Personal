function agregarAlCarrito(producto){
  const memoria = JSON.parse(localStorage.getItem("Amigurumi"));
  if (!memoria){
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("Amigurumi",JSON.stringify([nuevoProducto]));
  }else {
    const indiceProducto = memoria.findIndex(element => element.id === producto.id);
    console.log(indiceProducto)
    const Nuevamemoria = memoria;
    if(indiceProducto === -1){
      Nuevamemoria.push(getNuevoProductoParaMemoria(producto))
  
      
    }else{
      Nuevamemoria[indiceProducto].cantidad +=1 ;
      
    }localStorage.setItem("Amigurumi",JSON.stringify(Nuevamemoria));
    
  
  }
  }
  // Toma un producto le agrega cantidad 1 y lo devuelve
  
  function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
  
  }

//////////////////////////////////////////////////////////////////////////////////////

function crearTarjetascarro() {
  const Carrito = JSON.parse(localStorage.getItem("Amigurumi"));
  console.log(Carrito);
  if (Carrito && Carrito.length > 0) {
    const Contenedortarjetas = document.querySelector("#container_carrito");
    Contenedortarjetas.innerHTML = "";
    Carrito.forEach((element) => {
      const div = document.createElement("div");
      div.classList.add("element_1");
      div.innerHTML = ` 
        <img src="${element.img}" class="img_cat" alt="...">
        <div class="informacion">
            <h3 class="Nombre">${element.Nombre}</h3>
            <p class="precio">$${element.Precio.toLocaleString()}</p>
            <div>
        <button class = "sumas">+</button>
        <span class="cantidad">${element.cantidad}</span>
        <button class = "sumas">-</button>
        </div>
    `;

      Contenedortarjetas.append(div);
      div
      .getElementsByTagName("button")[0]
      .addEventListener("click" , ()=> {
        agregarAlCarrito(element)
        
      })
      div
      .getElementsByTagName("button")[1]
      .addEventListener("click" , ()=> {
        restarAlCarrito(element)
        crearTarjetascarro()})
    });
  }
}


function restarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("Amigurumi")) || [];
  const indiceProducto = memoria.findIndex(element => element.id === producto.id);

  if (indiceProducto !== -1) {
    if (memoria[indiceProducto].cantidad > 1) {
      memoria[indiceProducto].cantidad--;
    } else {
      memoria.splice(indiceProducto, 1); 
    }
    localStorage.setItem("Amigurumi", JSON.stringify(memoria));
    crearTarjetascarro(); 
  }else{
    crearTarjetascarro();
  }
}

crearTarjetascarro();


/* <img src="${element.img}" class="img_cat" alt="...">
        <div class="informacion">
            <h3 class="Nombre">${element.Nombre}</h3>
            <div class="cantidad">
                <p class="palabra_cantidad">Cantidad</p>
                <input type="number" class="cart-input" value="3" min="1">
            </div>
            <div class="sub_total">
                <p class="Sub_text_total">
                    Sub Total =
                </p>
                <ul>
                    <li class="sub_total_int">50000 </li>
                </ul>
            </div>
        </div>`; */