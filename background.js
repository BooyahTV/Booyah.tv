chrome.runtime.onInstalled.addListener(function() {
    // ...
  
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      // changeInfo object: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated#changeInfo
      // status is more reliable (in my case)
      // use "alert(JSON.stringify(changeInfo))" to check what's available and works in your case
   //   alert(JSON.stringify(changeInfo))
      if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {
          message: 'TabUpdated',
          url: tab.url
        });
      }
    })
});

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
);