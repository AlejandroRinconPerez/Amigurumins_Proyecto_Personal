const url = "./js/Catalogo.js";

async function obtener(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    callback(data);
    console.log(data);
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
}

function ver(Catalogo) {
  console.log(Catalogo);
}

function Crea_Catalogo(Productos) {
const ContenedorPadre = document.querySelector("#ContenedorPadre");
  ContenedorPadre.innerHTML = "";

  Productos.forEach((element) => {

    const div = document.createElement("div");
    div.classList.add("container_foto");
    div.classList.add("catalogo1");
    div.innerHTML = `
                <img src="./Archivos/Catalogo ${element.id}.png class="img_cat" alt="...">
                ${console.log(element.id)}
                <h3 class="nombre_amigui">${element.Nombre}</h3>
                <p class="descrip">${element.Descripcion}</p>
                <p class="precio">$${element.Precio.toLocaleString()}</p>
                <button class="button">Comprar</button>
           `;
    ContenedorPadre.append(div);
  });
}

Crea_Catalogo(Catalogo);
// obtener(Catalogo)
ver(Catalogo);
