const url = "./js/Catalogo.json";



async function obtener(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
}

async function Crea_Catalogo() {
let Productos =   await obtener(url)
const ContenedorPadre = document.querySelector("#ContenedorPadre");
  ContenedorPadre.innerHTML = "";
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
    document.querySelectorAll(".addToCart").forEach(buttonelement => {
      buttonelement.addEventListener("click",Agregar_elemento)
    })
    
  });
}

Crea_Catalogo();
