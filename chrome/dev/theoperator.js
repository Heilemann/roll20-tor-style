var reloadTimer;

function init () {
  // reloadOnChange(chrome.extension.getURL('/theoperator.js'));
  // reloadOnChange(chrome.extension.getURL('/manifest.json'));
  // reloadOnChange(chrome.extension.getURL('/mystyles.css'));
}

function reloadOnChange (url, checkIntervalMS) {
    if (!window.__watchedFiles) {
        window.__watchedFiles = {};
    }

    (function() {
        var self = arguments.callee;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (__watchedFiles[url] &&
                    __watchedFiles[url] != xhr.responseText) {
                    clearTimeout(reloadTimer);
                    chrome.runtime.reload();
                    init();
                } else {
                    __watchedFiles[url] = xhr.responseText;
                    window.setTimeout(self, checkIntervalMS || 1000);
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.send();
    })();
}

init();