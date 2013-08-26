'use strict';

// make sure extras object defined
var extras = extras || {};
extras.itemPage = {};

extras.itemPage.init = function() {
  
  var $container = $('.jtrac-view:nth-child(1) tbody ')
    , ticket = {
    	  status : $container.find('tr:nth-child(2) td:nth-child(2)').text().toLowerCase()
    	, id 	   : $container.find('tr:nth-child(1) td:nth-child(2)').text()
    	, title  : $container.find('tr:nth-child(3) td:nth-child(2)').text()
    }
    , icons = {
        'open'    : 'images/cross-button.png'
    	, 'reopen'	: 'images/cross-button.png'
    	, 'closed'	: 'images/thumb-up.png'
    	, 'not-bug' : 'images/question-button.png'
    	, 'solved'	: 'images/tick-button.png'
    	, 'later'	  : 'images/exclamation-button.png'
    }

  // change page title
  $('title').text(function() {
  	return extras.util.parse( '{id}: {title}', ticket );
  });

  // change fav icon based on status
  $('link[type="image/x-icon"]').attr('href', function() {
  	return chrome.extension.getURL( icons[ ticket.status ] );
  });
}
