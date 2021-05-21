// Put all the javascript code here, that you want to execute after page load.
function getAddElementsTo(nodeList, element) {
  nodeList.forEach(node => {
      element.appendChild(node.cloneNode(true))
  })
}

let markup = document.querySelectorAll('main')[0];
if (!markup) {
  markup = document.querySelector("body").cloneNode(true)
} else {
  markup = document.querySelectorAll('main')[0].cloneNode(true);
}

let header = document.querySelectorAll('link');
let styles = document.querySelectorAll('styles');
let stt = document.querySelectorAll('meta');
let doc = document.createElement("html")
let head = document.createElement("head");
let body = document.createElement("body")


// sets all the header tags
getAddElementsTo(header, head)
getAddElementsTo(styles, head)
getAddElementsTo(stt, head)

body.appendChild(markup);
doc.appendChild(head);
doc.appendChild(body);

function createDetail() {
  // add a new element to the DOM
  let detail = document.createElement("details")
  let div = document.createElement("p")
  let summary = document.createElement("summary")
  summary.textContent = "Ripped HTML"
  summary.style.fontSize = "1.5rem";
  div.textContent = markup.innerHTML;
  div.style.overflow = "scroll";
  div.style.height = "120px";
  div.setAttribute("id", "rippedHTML")

  detail.setAttribute("id", "page-html")
  detail.appendChild(summary);
  detail.appendChild(div);

  document.body.prepend(detail);
}

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {
      type: contentType
  });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

browser.runtime.onMessage.addListener(request => {
  if (request.action == "get_page_to_clipboard") {
      let pageScriptPara = document.getElementById("rippedHTML");
      pageScriptPara !== null ? document.getElementById("rippedHTML").innerText = markup.innerHTML : createDetail()
      navigator.clipboard.writeText(doc.innerHTML);
      document.execCommand("copy");
  }
  if (request.action == "save_page_as_file") {
      request.fileName == "_file" ? downloadToFile(doc.innerHTML, 'my-ripped-page.html', 'text/html') : downloadToFile(doc.innerHTML, request.fileName + ".html", 'text/html')
  }
});