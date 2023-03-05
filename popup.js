
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('saveUrls').addEventListener('click', saveUrlsToClipboard);
});

function saveUrlsToFile() {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    var urlText = '';
    tabs.forEach(function(tab) {
      urlText += tab.url + '\n';
    });
    var blob = new Blob([urlText], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var filename = 'tabs.txt'
    chrome.downloads.download({
      url: url,
      filename: filename,
      conflictAction: "uniquify",
      saveAs: false,
    });
  });
}

function saveUrlsToClipboard() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    var urls = tabs.map(function(tab) {
      return tab.url;
    });
    var urlText = urls.join('\n');
    navigator.clipboard.writeText(urlText).then(function() {
      console.log('URLs copied to clipboard');
      alert('URLs saved to clipboard!');
      saveUrlsToFile(tabs);
    }, function() {
      console.error('Failed to copy URLs to clipboard');
    });
  });
}
