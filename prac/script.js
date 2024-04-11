async function fetchTranslations() {
    
    const translations = {
            "en":{
                "titulo": "hello",
                "texto": "thank you very much for visiting this page"
            },
            "es":{
                "titulo":"hola",
                "texto":"muchas gracias por visitar esta pagina"
        
            },
            "fr":{
                "titulo":"Salut",
                "texto":"Merci beaucoup d'avoir visité cette page"
        
            },
            "de":{
                "titulo":"Hallo",
                "texto":"Vielen Dank für Ihren Besuch auf dieser Seite"
            },
            "it":{
                "titulo":"ciao",
                "texto":"grazie mille per aver visitato questa pagina"
            }
        };
    return translations;
}

document.addEventListener("DOMContentLoaded", function() {
    // Cargar el archivo JSON de idiomas
    function cambiarIdioma(idioma) 
    {
        const translations = await fetchTranslations();
        const translation = translations[idioma];
        const bigTextElement = document.getElementById("titulo");
        const paragraphElement = document.getElementById("texto");
        bigTextElement.textContent = translation.titulo;
        paragraphElement.textContent = translation.texto;
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
