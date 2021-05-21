let input = document.getElementById("file-name").value;
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("click-this").addEventListener("click", copyHTML);
  });

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("save-this").addEventListener("click", saveFile);
  });

  function copyHTML() {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log( document.getElementById("file-name").value)
      console.log(input )
      browser.tabs.sendMessage(tabs[0].id, {action: "get_page_to_clipboard"}, function(response) {});  
  });
  }

  function saveFile() {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
      browser.tabs.sendMessage(tabs[0].id, {action: "save_page_as_file", fileName: document.getElementById("file-name").value + "_file" }, function(response) {});  
  });
  }
