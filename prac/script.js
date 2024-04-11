import myJson from 'idiomas.json' assert {type: 'json'};

document.addEventListener("DOMContentLoaded", function() {
    // Cargar el archivo JSON de idiomas
    
    fetch('idiomas.json')
        .then(response => response.json())
        .then(data => {
            // Función para cambiar el idioma
            function cambiarIdioma(idioma) 
            {
                document.getElementById('titulo').innerText = myJson[idioma].titulo;
                document.getElementById('texto').innerText = myJson[idioma].texto;
            }
            
            // Event listeners para cada botón
            document.getElementById('en').addEventListener('click', function() {
                cambiarIdioma('en');
            });
            document.getElementById('es').addEventListener('click', function() {
                cambiarIdioma('es');
            });
            // Repetir para los otros botones
            
        })
});