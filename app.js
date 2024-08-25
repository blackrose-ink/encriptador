function encriptarTexto() {
    const texto = document.getElementById("textoEntrada").value;
    const textoEncriptado = texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");

    mostrarResultado('Texto encriptado:', textoEncriptado);
    ocultarImagenYTextoDebajo(); // Oculta la imagen y el texto debajo
}

function desencriptarTexto() {
    const texto = document.getElementById("textoEntrada").value;
    const textoDesencriptado = texto
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");

    mostrarResultado('Texto desencriptado:', textoDesencriptado);
    ocultarImagenYTextoDebajo(); // Oculta la imagen y el texto debajo
}

function mostrarResultado(titulo, resultado) {
    document.getElementById("textoResultado").value = resultado;
    // No es necesario ajustar la visibilidad de la imagen aquí, ya que se maneja en los eventos de entrada y resize
}

function copiarTexto() {
    const textoElemento = document.getElementById("textoResultado");
    textoElemento.select(); // Selecciona el texto en el textarea
    document.execCommand('copy'); // Copia el texto seleccionado al portapapeles

    // Alternativamente, puedes usar el API de Clipboard si está disponible
    // navigator.clipboard.writeText(textoElemento.value)
    //     .then(() => {
    //         console.log('Texto copiado al portapapeles');
    //     })
    //     .catch(err => {
    //         console.error('Error al copiar el texto: ', err);
    //     });

    ocultarImagenYTextoDebajo(); // Oculta la imagen y el texto debajo
}

function ocultarImagenYTextoDebajo() {
    document.getElementById("imagen").style.display = 'none';
    document.getElementById("textoDebajoImagen").style.display = 'none';
}

function ajustarVisibilidadImagenYTexto() {
    const texto = document.getElementById("textoEntrada").value;
    if (window.matchMedia("(min-width: 51rem)").matches) {
        // Solo mostrar la imagen y el texto debajo si el ancho de la pantalla es mayor a 50rem
        if (texto.trim() === "") {
            document.getElementById("textoDebajoImagen").style.display = 'block';
            document.getElementById("imagen").style.display = 'block';
        } else {
            ocultarImagenYTextoDebajo(); // Asegura que la imagen y el texto debajo se oculten si hay resultado
        }
    } else {
        // En pantallas pequeñas, siempre ocultar la imagen y el texto debajo
        ocultarImagenYTextoDebajo();
    }
}

// Añadir evento para verificar el campo de entrada y ajustar la visibilidad de la imagen y el texto debajo
document.getElementById("textoEntrada").addEventListener('input', function() {
    ajustarVisibilidadImagenYTexto(); // Ajusta visibilidad en función del contenido del textarea
    document.getElementById("botonCopiar").style.display = this.value.trim() === "" ? 'none' : 'block'; // Muestra/oculta el botón de copiar
    document.getElementById("textoResultado").value = this.value.trim() === "" ? "" : document.getElementById("textoResultado").value; // Limpia el resultado si está vacío
});

// Añadir evento para ajustar la visibilidad en función del tamaño de la pantalla
window.addEventListener('resize', ajustarVisibilidadImagenYTexto);

// Llamar a la función al cargar la página para ajustar la visibilidad inicial
document.addEventListener('DOMContentLoaded', ajustarVisibilidadImagenYTexto);