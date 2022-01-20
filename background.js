const loginUrl = "https://localhost/login"; // cambiar por url de la pagina que hagas vos

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // changeInfo object: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated#changeInfo
    // status is more reliable (in my case)
    // use "alert(JSON.stringify(changeInfo))" to check what's available and works in your case
    if (changeInfo.status === 'complete') {
      chrome.tabs.sendMessage(tabId, {
        message: 'TabUpdated',
        url: tab.url
      });
    }
  })

  /*
  var uid = null
  
  chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "setUID":
                uid = message.uid;
                break;
            case "getUID":
              if(uid){
                sendResponse(uid);
              }
              break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
  );*/

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    // ignorar si no viene de la pagina de login
    // sino alguien podria hacer una pagina para ir borrando los tokens de la gente
    // no les sirviria de nada, solo para molestar, pero lo podrian hacer
    if(!sender.url.startsWith(loginUrl)) return;
    if (request.type == "token"){
      chrome.storage.local.set({ token: request.options.token }, function () {
        console.log("Token guardado");
      });  
    }
  }
);