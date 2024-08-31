const url = "./js/Catalogo.json";

async function obtener(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    return data
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
}

async function Crea_Catalogo(event) {
let Productos =   await obtener(url)
const ContenedorPadre = document.querySelector("#ContenedorPadre");
  ContenedorPadre.innerHTML = "";
  if (event ==2 ){
    Productos = Productos.sort((a,b) => b.Precio - a.Precio)
    } else if (event == 1){
  var  Descuentos = Productos.filter((element)=>{
    return element.Descuento == true
  } )
     }
  if(Descuentos && Descuentos.length > 0){
    Productos = Descuentos
  }
  Productos.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("container_foto");
    div.classList.add("catalogo1");
    div.innerHTML = `
                <img src="${element.img}" class="img_cat" alt="...">
                <h3 class="nombre_amigui">${element.Nombre}</h3>
                <p class="descrip">${element.Descripcion}</p>
                <p class="precio">$${element.Precio.toLocaleString()}</p>
                <button class="button">Comprar</button>
           `;
    ContenedorPadre.append(div);
    div.getElementsByTagName("button")[0].addEventListener("click",()=>  agregarAlCarrito(element))
    
  })};

  (async () => {
    await Crea_Catalogo();
  })();
  
 


const mayor = document.querySelector("#mayor")
mayor.addEventListener("click",(event)=>  Crea_Catalogo(2) ) 
const menor = document.querySelector("#menor")
menor.addEventListener("click",(event)=>  Crea_Catalogo(1) ) 
const normal = document.querySelector("#titulocat")
normal.addEventListener("click",(event)=>  Crea_Catalogo(0) ) 




let Amigurumis =[]
Amigurumis = obtener(url)

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
  actualizarNumeroCarrito();
}
}


// Toma un producto le agrega cantidad 1 y lo devuelve

function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;

}

const Contador = document.getElementById("Numero")
function actualizarNumeroCarrito(){
  const memoria = JSON.parse(localStorage.getItem("Amigurumi")) || [];
  const cuenta =memoria.reduce((acum, current) => acum + current.cantidad,0);
  Contador.innerText =""
  Contador.innerText = cuenta;
  console.log(cuenta)

}
actualizarNumeroCarrito();







