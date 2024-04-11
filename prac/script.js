const urlTraducciones = 'idiomas.json';

// Función para cambiar el idioma
function cambiarIdioma(idioma) {
    fetch('idiomas.json')
        .then(response => response.json())
        .then(data => {
            const traduccion = data[idioma];
            document.getElementById('titulo').textContent = traduccion.titulo;
            document.getElementById('texto').textContent = traduccion.texto;
        })
        .catch(error => console.error('Error al cargar las traducciones:', error));
}
