//#region ----------- Elements ------------

const pregunta = document.getElementById("pregunta");
textFit(pregunta);

//#endregion


//#region ------------ Trivia --------------

const preguntaTxt = document.getElementById('pregunta-text');
const respuestas = document.getElementsByClassName('r-button');

for(let i = 0; i < respuestas.length; i++)
respuestas[i].addEventListener("click", function() { surveyButton(respuestas[i]); });

let survey;
let index = 0;
loadSurvey();

async function loadSurvey()
{
    await fetch('../json/preguntas.json').then(r => r.json()).then(j => survey = j);
    shuffleArray(survey.preguntas);
    showNextQuestion();
}
function showNextQuestion()
{
    var question = survey.preguntas[index];
    index++;

    preguntaTxt.innerHTML = question.pregunta;
    textFit(pregunta);

    shuffleArray(question.respuestas);
    for (let i = 0; i < respuestas.length; i++) respuestas[i].value = question.respuestas[i];
}
function surveyButton(self)
{
    if (self.value == survey.preguntas[index - 1].respuesta) console.log("correcto");
    else console.log("incorrecto");
    
    if (index >= survey.preguntas.length) { console.log("finsh"); return; }
    showNextQuestion();
}

//#endregion

//#region ----------- QR Scanner -----------
    
    // create scanner instance
    const qr = document.getElementById('qr');
    const result = document.getElementById('result');
    let scanner = new Html5QrcodeScanner("reader", { fps: 20, qrbox: { width: 250, height: 250 } });
    
    document.getElementById('open-qr').addEventListener('click', openQR);
    document.getElementById('close-qr').addEventListener('click', closeQR);

    function openQR()
    {
        scanner.render(success, error);
        console.log("start scanning");
        removeClass(qr, 'unselectable');
        swipeClases(qr, 'fadeOut', 'fadeIn');
    }
    function closeQR()
    {
        scanner.clear();
        addClass(qr, 'unselectable');
        swipeClases(qr, 'fadeIn', 'fadeOut');
    }
    function error(exception) { closeQR(); console.error(exception); }
    function success(text)
    {
        scanner.clear();
        console.log(`scaned ${text}`);
        result.innerHTML = `<p>${text}</p>`;
        textFit(result);
    }

//#endregion 