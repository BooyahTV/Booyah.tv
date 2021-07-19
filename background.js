chrome.runtime.onInstalled.addListener(function() {
    // ...
  
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
});



/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request) {
      if (request.msg == "sendEmote") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (activeTabs) {
            chrome.tabs.executeScript(activeTabs[0].id, {
              code: `
                var event = new Event("input", { bubbles: true });
                var textbox = document.getElementsByClassName("components-input-element")[0]; 
                textbox.value +="${request.data.name} ";
                textbox.focus();
                textbox.scrollLeft = textbox.scrollWidth;
                textbox.dispatchEvent(event);
              `,
            });
          }
        );
      }
  }
});
*/

