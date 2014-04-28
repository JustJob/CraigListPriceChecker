function getTitle() {
  return $ ? $('.postingtitle').text() : $;
}

function getBody() {
  return $ ? $('#postingbody').text() : $;
}


chrome.extension.sendRequest({
  'title': getTitle(), 
  'body': getBody()
}, function(response) {});