// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var priceGetter = {
  edmundsApi: 'https://api.edmunds.com/api/vehicle/v2/',

  getPrice: function() {
    var me = this;
    chrome.extension.sendRequest({}, function(title, body) {
      me.title = title;
      me.body = body;
    });

    var findYear = this.findYear();
  },

  findYear: function() {
    var yearRegex = /\d{2}(\d{2})?/gi
    matches = this.title.match(yearRegex);
    matches += this.body.match(yearRegex);
  },
  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var kittens = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < kittens.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructKittenURL_(kittens[i]);
      img.setAttribute('alt', kittens[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  onRequest: function(request, sender, sendResponse) {
    if(request.title != "" ||  request.body != "") {
      priceGetter.title = request.title;
      priceGetter.body = request.body;

      var findYear = priceGetter.findYear();
    }
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  //priceGetter.getPrice();
  chrome.extension.onRequest.addListener(priceGetter.onRequest);
});
