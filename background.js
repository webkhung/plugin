chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.executeScript(null, {file: "content_script.js"});
  }
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(localStorage['disabled'] == 'true') {
    chrome.browserAction.setIcon({path:'glasses24-disabled.png'});
  }
  else {
    chrome.browserAction.setIcon({path:'glasses24.png'});
  }

  if (request.method == "getLocalStorage") {
    if(localStorage['disabled'] != undefined && localStorage['disabled'] == 'true')
    {
        sendResponse({});
    }
    else {
        sendResponse({data: (localStorage['settings'] || 'font-size:17px;line-height:1.5em')});
    }
  }
  else
    sendResponse({});
});

chrome.browserAction.onClicked.addListener(function (tab) {
    if (localStorage['disabled'] == 'undefined'){
        localStorage['disabled'] = 'true'
    }
    else {
        if(localStorage['disabled'] == 'true') {
            localStorage['disabled'] = 'false';
        }
        else {
            localStorage['disabled'] = 'true';
        }
    }
    var code = 'window.location.reload();';
    chrome.tabs.executeScript(tab.id, {code: code});
});
