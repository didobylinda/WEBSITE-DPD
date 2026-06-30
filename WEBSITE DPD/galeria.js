// Variables globales para controlar el estado del carrusel interactivo
let imagenesCarrusel = [];
let indiceActual = 0;

function abrirModal(titulo, autor, descripcion, listaImagenes) {
    // 1. Buscamos los contenedores de texto de tu modal actual
    document.querySelector('.modal-detalles h2').innerText = titulo;
    document.querySelector('.modal-autor').innerText = autor;
    document.querySelector('.modal-descripcion').innerText = descripcion;
    
    // Cargamos las imágenes recibidas en el array global
    // Si se pasa una sola imagen string por error, la convertimos en lista para que no falle
    imagenesCarrusel = Array.isArray(listaImagenes) ? listaImagenes : [listaImagenes];
    indiceActual = 0; // Reiniciamos siempre a la primera foto
    
    // 3. Renderizamos la primera imagen en el asset de la modal
    document.getElementById('modalImgAsset').src = imagenesCarrusel[indiceActual];
    
    // 4. Abrimos la modal agregando tu clase de transición
    document.querySelector('.modal').classList.add('abierto');
}

function cambiarImagen(direccion) {
    if (imagenesCarrusel.length <= 1) return; // Si el proyecto solo tiene una foto, no hace nada
    
    // Calculamos el siguiente índice de forma circular inteligente
    indiceActual += direccion;
    
    if (indiceActual >= imagenesCarrusel.length) {
        indiceActual = 0; // Regresa al inicio
    } else if (indiceActual < 0) {
        indiceActual = imagenesCarrusel.length - 1; // Se va a la última foto
    }
    
    // Cambiamos el atributo src suavemente con la nueva ruta de imagen
    document.getElementById('modalImgAsset').src = imagenesCarrusel[indiceActual];
}

// Función complementaria para cerrar la modal limpiamente
function cerrarModal() {
    document.querySelector('.modal').classList.remove('abierto');
}