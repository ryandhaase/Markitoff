// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .


var sendTrackableEvent = function(domain, url, event){
  var _bm_event = {
    event: {
      domain: domain,
      url: url,
      event: event
    }
  };

  var _bm_request = new XMLHttpRequest();
  _bm_request.open('POST', 'http://localhost:3001/events', true);
  _bm_request.setRequestHeader('Content-Type', 'application/json');
  _bm_request.setRequestHeader('Authorization', 'Token token=dacb9f7b92c77a922f9c878ac63abc4c' );
  _bm_request.onreadystatechange = function() {
  };
  _bm_request.send(JSON.stringify(_bm_event));
};

$(document).ready(function(){
    sendTrackableEvent(document.location.host, document.location.pathname, "pageview")

    $("a.trackable").click(function(){
            sendTrackableEvent(document.location.host, document.location.pathname, $(this).data("track"));
        }
    )
});
