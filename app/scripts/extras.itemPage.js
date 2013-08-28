'use strict';

// make sure extras object defined
var extras = extras || {}
, ticket;
extras.itemPage = {};

extras.itemPage.init = function() {
  
  var $container = $('.jtrac-view:nth-child(1) tbody ')
    , icons = {
        'open'    : 'images/cross-button.png'
      , 'reopen'  : 'images/cross-button.png'
      , 'closed'  : 'images/thumb-up.png'
      , 'not-bug' : 'images/question-button.png'
      , 'solved'  : 'images/tick-button.png'
      , 'later'   : 'images/exclamation-button.png'
    }
    , ticket = {
    	  status      : $container.find('tr:nth-child(2) td:nth-child(2)').text().toLowerCase()
    	, id 	        : $container.find('tr:nth-child(1) td:nth-child(2)').text()
    	, summary     : $container.find('tr:nth-child(3) td:nth-child(2)').text()
      , detail      : $container.find('tr:nth-child(4) td:nth-child(2)').text()
      , severity    : $container.find('tr:nth-child(5) td:nth-child(2)').text()
      , assignedTo  : $container.find('tr:nth-child(2) td:nth-child(6)').text()
      , loggedBy    : $container.find('tr:nth-child(2) td:nth-child(4)').text()
    }
    , history = [];

  // change page title
  $('title').text(function() {
  	return extras.util.parse( '{id}: {summary}', ticket );
  });

  // change fav icon based on status
  $('link[type="image/x-icon"]').attr('href', function() {
  	return chrome.extension.getURL( icons[ ticket.status ] );
  });

  // expose ticket object
  extras.itemPage.ticket = ticket;
  extras.itemPage.history = history;
}