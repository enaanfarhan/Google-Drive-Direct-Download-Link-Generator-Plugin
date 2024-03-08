document.addEventListener("DOMContentLoaded", function() {
  var generateLinkBtn = document.getElementById("generate-link-btn");
  var copyLinkBtn = document.getElementById("copy-link-btn");
  var sharingUrlInput = document.getElementById("sharing-url");
  var outputLinkDiv = document.getElementById("output-link");
  var messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  copyLinkBtn.parentNode.insertBefore(messageContainer, copyLinkBtn.nextSibling);

  generateLinkBtn.addEventListener("click", function() {
    var sharingUrl = sharingUrlInput.value.trim();
    var fileId = extractFileId(sharingUrl);
    if (fileId) {
      var directLink = "https://drive.google.com/uc?export=download&id=" + fileId;
      outputLinkDiv.innerHTML = "<a href='" + directLink + "' target='_blank'>" + directLink + "</a>";
      copyLinkBtn.setAttribute("data-link", directLink); // Set data-link attribute for copying
    } else {
      outputLinkDiv.innerHTML = "Invalid sharing URL!";
    }
  });

  copyLinkBtn.addEventListener("click", function() {
    var linkToCopy = copyLinkBtn.getAttribute("data-link");
    if (linkToCopy) {
      var tempInput = document.createElement("input");
      tempInput.setAttribute("value", linkToCopy);
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      showMessage("Link copied to clipboard!", "success");
    } else {
      showMessage("No link to copy!", "error");
    }
  });

  function extractFileId(url) {
    var match = url.match(/\/file\/d\/([^\/]+)/);
    return match ? match[1] : null;
  }

  function showMessage(message, type) {
    var messageElement = document.createElement("div");
    messageElement.classList.add("message", type);
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    setTimeout(function() {
      messageElement.remove();
    }, 3000);
  }
});
