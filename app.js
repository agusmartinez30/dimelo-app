console.log('Conectado');

const salida = document.getElementById('salida')
const microfono = document.getElementById('btnGrabar')
const btnEscuchar = document.getElementById('btnEscuchar')
const permiso = document.querySelector('.permiso')


microfono.addEventListener('click', ejecutarSpeechAPI)

btnEscuchar.addEventListener('click', (e) => {
    const salidaTxt = document.querySelector('#salida p').textContent
    hablar(salidaTxt)
    console.log(salidaTxt);
} )


function hablar(texto){
    speechSynthesis.speak( new SpeechSynthesisUtterance(texto))

}



function ejecutarSpeechAPI(){
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition()
    recognition.lang = 'es';

    recognition.start();

    recognition.onstart = function(){
        salida.classList.add('mostrar')
        salida.textContent = 'Escuchando...'
    }

    recognition.onspeechend = function(){
        salida.textContent = 'se dejo de grabar';
        recognition.stop()
    } 

    recognition.onresult = function(e){
        console.log(e.results);


        const {confidence, transcript} = e.results[0][0]

        const speech = document.createElement('p')
        speech.textContent = `Grabado: ${transcript}`

        const seguridad = document.createElement('p')
        seguridad.textContent = `Coincidencia: ${ parseInt( confidence * 100)} %`

       

        
        salida.appendChild(speech)
        salida.appendChild(seguridad)
    }

  

    permiso.classList.add('ocultar')
    btnEscuchar.classList.add('mostrar-btn-escuchar')



}