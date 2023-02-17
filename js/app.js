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
    
    const qr = document.getElementById('qr');
    const result = document.getElementById('result');
    const scanner = document.getElementById('qr-scanner');

    // let cameraID;
    let config = { fps: 10, qrbox: { width: 150, height: 150 } }
    let codeScanner = new Html5QrcodeScanner("reader", config);;
    
    //Callbacks
    const errorCallback = (exception) => {  }
    const qrCodeSuccessCallback = (decodedText) =>
    {
        result.innerHTML = `<p> ${decodedText} </p>`;
        addClass(scanner, 'unselectable');
        codeScanner.clear();
        textFit(result);
        showResult();
    }
    
    //Inputs
    document.getElementById('open-qr').addEventListener('click', openQR);
    document.getElementById('close-qr').addEventListener('click', closeResult);

    async function openQR()
    {
        codeScanner.render(qrCodeSuccessCallback, errorCallback);
        removeClass(scanner, 'unselectable');
        console.log("start scanning");
        result.innerHTML = '';
    }
    function closeQR()
    {
        addClass(scanner, 'unselectable');
        console.log("close scanner");
        codeScanner.clear();
    }
    function showResult()
    {
        swipeClases(qr, 'fadeOut', 'fadeIn');
        removeClass(qr, 'unselectable');
    }
    function closeResult()
    {
        swipeClases(qr, 'fadeIn', 'fadeOut');
        addClass(qr, 'unselectable');
    }

//#endregion 