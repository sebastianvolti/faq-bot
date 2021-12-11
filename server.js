const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1886211521:AAEvfV7JWX-YhTnniBVxjXIjB7WgHa9T3Gc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const globalStatus = new Map();

const errorMessageList = [
  "No comprendimos tu consulta, ¿puedes intentarlo de nuevo?",
  "No comprendimos tu consulta, ¿puedes intentarlo nuevamente?",
  "No comprendimos tu consulta, ¿puedes intentarlo otra vez?",
  "No comprendimos tu pregunta, ¿puedes intentarlo de nuevo?",
  "No comprendimos tu pregunta, ¿puedes intentarlo nuevamente?",
  "No comprendimos tu pregunta, ¿puedes intentarlo otra vez?",
  "No logramos comprender tu consulta, ¿puedes intentarlo de nuevo?",
  "No logramos comprender tu consulta, ¿puedes intentarlo nuevamente?",
  "No logramos comprender tu consulta, ¿puedes intentarlo otra vez?",
  "No logramos comprender tu pregunta, ¿puedes intentarlo de nuevo?",
  "No logramos comprender tu pregunta, ¿puedes intentarlo nuevamente?",
  "No logramos comprender tu pregunta, ¿puedes intentarlo otra vez?"
]

const dosisQuestionList = [
  "que tipo de vacuna me corresponde",
  "que tipo de dosis me corresponde",
  "que dosis hay en uruguay",
  "que tipo de vacuna hay en uruguay",
  "que tipo de vacuna hay",
  "que dosis me tengo que dar",
  "que vacuna me tengo que dar",
  "que dosis me corresponde",
  "cuales son las vacunas que hay",
  "cuales son los tipos de vacuna que hay",
  "cuantas vacunas tengo que darme",
  "cuantas dosis tengo que darme",
  "cual es la cantidad de dosis tengo que darme",
  "cuantas dosis me corresponden",
  "cuantas dosis de sinovac me tengo que dar",
  "cuantas dosis de sinovac me corresponden",
  "cuantas dosis de faiser me tengo que dar",
  "cuantas dosis de faiser me corresponden",
  "cuantas dosis de pfizer me tengo que dar",
  "cuantas dosis de fizer me corresponden",
  "cuantas dosis de fizer me tengo que dar",
  "cuantas dosis de pizer me corresponden",
  "cuantas dosis de pizer me tengo que dar",
]

const dosisAnswer = "Todos los ciudadanos recibirán 2 dosis.\n\nLos tipos de dosis son repartidos según el siguiente rango de edades:\n\nPfizer: 60-90\n\nSinovac:18-60.\n\nActualmente se cuenta en stock con ambas partidas.";

const reservationQuestionList = [
  "quisiera saber como puedo reservar hora para vacunarme",
  "como hago para reservar agenda",
  "como hago para reservar hora",
  "quiero vacunamre como hago para reservar hora",
  "como reservo hora",
  "donde puedo reservar hora",
  "quiero agendarme para reservar hora",
  "quiero vacunarme",
  "quiero reservar hora",
  "donde puedo reservar agenda de de vacunacion",
  "donde puedo reservar agenda"
]

const reservationAnswer = "Para reservar agenda de vacunación tenes 2 opciones, puedes hacerlo a través desde el siguiente bot: @TSEVacunasBot\n\nTambien puedes reservar agenda desde vacunas07.web.elasticloud.uy, luego de iniciar sesión con tu usuario de gub.uy.";

const agendasQuestionList = [
  "donde puedo vacunarme",
  "en que lugar puedo vacunarme",
  "en que lugar me corresponde vacunarme",
  "en que vacunatorio me corresponde vacunarme",
  "en que vacunatorio me puedo vacunar",
  "en que vacunatorio me puedo agendar",
  "en que vacunatorio me corresponde agendarme",
  "vacunatorios disponibles",
  "hay agendas disponibles",
  "donde veo las agendas disponibles",
  "hay agendas disponible para mi rango de edad",
  "tengo años hay agendas disponibles",
  "agendas disponibles años rango edad",
  "agendas disponibles para mi edad tengo",
  "hay disponibilidad de agendas ",
  "donde veo las agendas abiertas",
  "hay agendas abiertas",
  "hay agendas abiertas para mi edad ",
  "hay agendas abiertas para mi departamento ",
  "agendas abiertas disponibles en artigas ",
  "agendas abiertas disponibles en salto",
  "agendas abiertas disponibles en rivera",
  "agendas abiertas disponibles en tacuarembo",
  "agendas abiertas disponibles en paysandu",
  "agendas abiertas disponibles en cerro largo",
  "agendas abiertas disponibles en durazno",
  "agendas abiertas disponibles en rio negro ",
  "agendas abiertas disponibles en treinta y tres",
  "agendas abiertas disponibles en florida",
  "agendas abiertas disponibles en flores",
  "agendas abiertas disponibles en soriano",
  "agendas abiertas disponibles en colonia",
  "agendas abiertas disponibles en san jose",
  "agendas abiertas disponibles en lavalleja ",
  "agendas abiertas disponibles en rocha",
  "agendas abiertas disponibles en maldonado",
  "agendas abiertas disponibles en canelones",
  "agendas abiertas disponibles en montevideo",
  "vacunatorios disponibles en artigas ",
  "vacunatorios disponibles en salto",
  "vacunatorios disponibles en rivera",
  "avacunatorios disponibles en tacuarembo",
  "vacunatorios disponibles en paysandu",
  "vacunatorios disponibles en cerro largo",
  "vacunatorios disponibles en durazno",
  "vacunatorios disponibles en rio negro ",
  "vacunatorios disponibles en treinta y tres",
  "vacunatorios disponibles en florida",
  "vacunatorios disponibles en flores",
  "vacunatorios disponibles en soriano",
  "vacunatorios disponibles en colonia",
  "vacunatorios disponibles en san jose",
  "vacunatorios disponibles en lavalleja ",
  "vacunatorios disponibles en rocha",
  "vacunatorios disponibles en maldonado",
  "vacunatorios disponibles en canelones",
  "vacunatorios disponibles en montevideo",
]

const agendasAnswer = "Puede consultar las agendas disponibles en vacunas07.web.elasticloud.uy.\n\nEl sistema permite filtrar por departamento, fechas, y rango de edades.";

const byeQuestionList = [
  "gracias hasta luego",
  "gracias nos vemos",
  "gracias por la ayuda",
  "gracias chau adios",
  "chau nos vemos",
  "adios nos vemois",
  "hasta luego",
  "gracias por todo"
]

const byeAnswer = "Gracias por contactarte con nuestro bot, esperemos haberte ayudado.\n\nAnte cualquier consulta no dudes en comunicarte nuevamente!"

const welcomeQuestionList = [
  "buenas tardes tengo una pregunta",
  "buen día tengo una pregunta",
  "hola como estan",
  "hola buenos dias",
  "hola buenos tardes",
  "hola buenos noches",
  "buenas como estan",
  "buenas tengo una consulta",
  "buenas tengo una pregunta",
  "buenas como va",
  "hola como va",
  "hola todo bien tengo una consulta",
  "buenas tardes como estan",
  "buenos dias como va",
  "buenos dias como estan",
  "hola buenas como andan"
]

const welcomeAnswerList = [
  "Hola, ¿en que podemos ayudarte?",
  "Hola, ¿en que te podemos ayudar?",
  "Buenas, ¿en que podemos ayudarte?",
  "Buenas, ¿en que te podemos ayudar?"
]

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  try{
    console.log(msg.text.toLowerCase().trim());
    const chatId = msg.chat.id;
    var chatStatus = globalStatus.get(chatId);
    handleChatStatus(chatId, msg, chatStatus);

  }catch(error){
    console.log(error);
  }
});

const handleChatStatus = (chatId, msg, status) => {
  if(!status){
    bot.sendMessage(chatId, "Hola! Bienvenido al bot de preguntas frecuentes de vacunas07.web.elasticloud.uy\n\n¿En qué podemos ayudarte?\n\nRecuerda que también puedes consultar la página de preguntas frecuentes del MSP: https://www.gub.uy/ministerio-salud-publica/comunicacion/publicaciones/preguntas-frecuentes-vacunacion-covid-19/preguntas-frecuentes-11");  
    status = {
      welcome: false
    }
    globalStatus.set(chatId, status);
    return;
  }  

  if(status && !status.welcome){
    data = levenshteinDistance(msg.text.toLowerCase().trim(), welcomeQuestionList);
    if (data.minValue < "8") {
      status.welcome = true;
      globalStatus.set(chatId, status);
      bot.sendMessage(chatId, handleRandomSelectMessage(welcomeAnswerList));
      return;
    }
  }

  if (msg.text.length <= 8 && status) {
    if (status.welcome) {
      bot.sendMessage(chatId, "¿Podrías explicar un poco más tu consulta? Te dejamos algunas preguntas frecuentes:\n\n ¿Donde veo las agendas disponibles?\n\n¿Cuántas dosis tengo que darme?\n\n¿Que tipo dosis me corresponde?");
    }
    else {
      status.welcome = true;
      globalStatus.set(chatId, status);
      bot.sendMessage(chatId, handleRandomSelectMessage(welcomeAnswerList));
    }
    return;
  }

  var data = null;
  var minValueAnswer = null;
  var minTextAnswer = null;
  data = levenshteinDistance(msg.text.toLowerCase().trim(), agendasQuestionList);
  minValueAnswer = data.minValue;
  minTextAnswer = agendasAnswer;
  if (data.minValue <= 0) {
    bot.sendMessage(chatId, agendasAnswer);
    return; 
  }
  
  data = levenshteinDistance(msg.text.toLowerCase().trim(), dosisQuestionList);
  if (data.minValue < minValueAnswer) {
    minValueAnswer = data.minValue;
    minTextAnswer = dosisAnswer;
  }
  if (data.minValue <= 0) {
    bot.sendMessage(chatId, dosisAnswer);
    return; 
  }

  data = levenshteinDistance(msg.text.toLowerCase().trim(), reservationQuestionList);
  if (data.minValue < minValueAnswer) {
    minValueAnswer = data.minValue;
    minTextAnswer = reservationAnswer;
  }
  if (data.minValue <= 0) {
    bot.sendMessage(chatId, reservationAnswer);
    return;
  }
  
  if (minValueAnswer <= 12) {
    bot.sendMessage(chatId, minTextAnswer);
  }
  else {

    data = levenshteinDistance(msg.text.toLowerCase().trim(), byeQuestionList);
    if (data.minValue < 8) {
      bot.sendMessage(chatId, byeAnswer);
    }
    else {
      bot.sendMessage(chatId, handleRandomSelectMessage(errorMessageList));    
    }
    return;
  }
  
}

const handleRandomSelectMessage = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}


const levenshteinDistance = (a, list) => {
  var minValue = 1000000;
  var textAnswer = "";

  list.forEach(b => {
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
        } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                              Math.min(matrix[i][j-1] + 1, // insertion
                                    matrix[i-1][j] + 1)); // deletion
        }
      }
    }
    var diff =  matrix[b.length][a.length];
    if (diff < minValue) {
      minValue = diff;
      textAnswer = b;
    }

  });
  return {textAnswer, minValue};
}