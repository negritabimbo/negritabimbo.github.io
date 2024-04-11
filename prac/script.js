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

async function updateTextContent(language) {
    const translations = await fetchTranslations();
    const translation = translations[language];
    const bigTextElement = document.getElementById("big-text");
    const paragraphElement = document.getElementById("paragraph");
    bigTextElement.textContent = translation.big_text;
    paragraphElement.textContent = translation.paragraph;
}

const languageButtons = document.querySelectorAll('.language-button');
languageButtons.forEach(button => {
    button.addEventListener('click', function() {
        const language = this.getAttribute('data-lang');
        updateTextContent(language);
    });
});
            
            /* Event listeners para cada botón
            document.getElementById('en').addEventListener('click', function() {
                cambiarIdioma('en');
            });
            document.getElementById('es').addEventListener('click', function() {
                cambiarIdioma('es');
            });*/

