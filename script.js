//Función asíncrona para obtener una frase aleatoria desde la API.
async function obtenerFrase() {
    try {
        //Hacemos la solicitud a la API
        const respuesta = await fetch('https://api.chucknorris.io/jokes/random');

        //Convertimos la respuesta a Json.
        const datos = await respuesta.json();

        //Mostramos la frase en el DOM.
        document.getElementById('frase').innerHTML = "Frase en inglés: " + datos.value;

        //Traducimos la frase al español utilizando otra API.
        traducirFrase(datos.value); //Pasamos la frase en inglés a la función de traducción.

    } catch (error) {
        //En caso de un error, mostramos un mensaje.
        document.getElementById('frase').innerHTML = 'Ups! Hubo un error al obtener la información 😟';
        console.error(error);
    }
}

//Funcion para traducir la frase utilizando la API  de MyMemory Translate.
async function traducirFrase(fraseIngles) {
    try {
        //Codificamos la frase para incluirla en la URL.
        const fraseCodeada = encodeURIComponent(fraseIngles);
        //Configuración de la solicitud a la API de traducción.
        const url = `https://api.mymemory.translated.net/get?q=${fraseCodeada}&langpair=en|es`;
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error('Error en la solicitud de traducción: + respuesta.statusText');
        }


        const datos = await respuesta.json();

        //Mostramos la frase traducida en el DOM.
        document.getElementById('frase').innerHTML += "<br><br>Frase traducida: " + datos.responseData.translatedText;
    } catch (error) {
        document.getElementById('frase').innerHTML += '<br>¡Ups! No se pudo traducir la frase 😓';
        console.error(error);
    }
}

//Obtener una frase al presionar el botón.
document.getElementById('nuevaFrase').addEventListener('click', obtenerFrase);

//Ejecutamos la función al cargar la página.
obtenerFrase();

