// function testSendFollowupText() {
//   var result = sendFollowupTextChatWoot(
//     '5541998596654',
//     'Teste de envio automático',
//   );

//   Logger.log(result);
// }

// function sendFollowupTextChatWoot(phoneNumber, text, name) {
//   // Cada envio gera custo, pra usar isso precisa ser comunicado o time de projetos
//   Logger.log(phoneNumber)
//   if (!phoneNumber) {
//     throw new Error('phoneNumber é obrigatório e deve ser uma string.');
//   }

//   if (!text) {
//     throw new Error('text é obrigatório e deve ser uma string.');
//   }

//   var url = 'https://krill-amazed-evenly.ngrok-free.app/operation/followup/send-text';

//   var payload = {
//     phoneNumber: phoneNumber,
//     text: text,
//     name: name
//   };

//   var options = {
//     method: 'post',
//     contentType: 'application/json',
//     payload: JSON.stringify(payload),
//     muteHttpExceptions: true
//   };

//   var response = UrlFetchApp.fetch(url, options);
//   var statusCode = response.getResponseCode();
//   var responseText = response.getContentText();

//   if (statusCode < 200 || statusCode >= 300) {
//     throw new Error(
//       'Erro ao enviar mensagem. Status: ' +
//       statusCode +
//       ' | Resposta: ' +
//       responseText
//     );
//   }

//   try {
//     return JSON.parse(responseText);
//   } catch (error) {
//     return {
//       statusCode: statusCode,
//       body: responseText
//     };
//   }
// }