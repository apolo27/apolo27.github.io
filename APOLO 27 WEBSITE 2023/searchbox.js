// Obtener el elemento de la barra de búsqueda
const searchbox = document.querySelector(".searchbox");

// Crear un elemento de entrada de texto
const input = document.querySelector("input");

function removeAccents(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

// Agregar un evento de escucha para el elemento de entrada de texto
input.addEventListener("keyup", function(event) {
  // Cancelar el evento si la tecla presionada no es "Enter"
  if (event.key == "Enter"){
    // console.log("Enter");
    return;
  }
  Array.from(document.querySelector(".labels").children).forEach(function(label){label.classList.remove("active")});
  document.querySelector("#all-button").classList.add("active");
  
  // Realizar la búsqueda con regex
  const query = new RegExp(removeAccents(input.value.toLowerCase()));
  let cards = POSTS.filter(function(element){
    return query.test(removeAccents((element.content + element.title + element.theme).toLowerCase()));
  });
  console.log(cards);
  updateCards(cards);
});
