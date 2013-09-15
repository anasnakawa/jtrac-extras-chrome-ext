(function(extras) {

  'use strict';

  extras.itemPage = {};

  var ticket = {}
  , history = []
  
  , historyItemFactory = function($row) {
    var $attatch = $row.children('td').eq(3)
    , url = $attatch.find('span').eq(0).children('span').attr('onclick')
    , $timeStamp = $row.find('td').last()
    , item = {
        loggedBy: $row.children('td').eq(0).text()
        , status: $row.children('td').eq(1).text()
        , assignedTo: $row.children('td').eq(2).text()
        , comment: {
            text: $attatch.children('span').eq(1).text()
            , element: $attatch.get(0)
            , attachement: {
                fileName: extras.util.trim( $attatch.find('span').eq(0).text() )
                , url: typeof url === 'string' ? url.substr(120, 90) : url
            }
        }
        , timeStamp: {
            element: $timeStamp.get(0)
          , text: $timeStamp.text()
        }
    };

    $timeStamp
        .attr( 'title', item.timeStamp.text )
        .text( moment( item.timeStamp.text ).fromNow() );

    return item;
  }

  , ticketItemFactory = function($container) {
    return {
        status      : $container.find('tr:nth-child(2) td:nth-child(2)').text().toLowerCase()
      , id          : $container.find('tr:nth-child(1) td:nth-child(2)').text()
      , summary     : $container.find('tr:nth-child(3) td:nth-child(2)').text()
      , detail      : $container.find('tr:nth-child(4) td:nth-child(2)').text()
      , severity    : $container.find('tr:nth-child(5) td:nth-child(2)').text()
      , assignedTo  : $container.find('tr:nth-child(2) td:nth-child(6)').text()
      , loggedBy    : $container.find('tr:nth-child(2) td:nth-child(4)').text()
    };
  }

  , pageInit = function() {
    var $container = $('.jtrac-view:nth-child(1) tbody ')
    , $history = $('.jtrac-view:eq(1) tbody tr')
    , icons = {
        'open'    : 'images/cross-button.png'
      , 'reopen'  : 'images/cross-button.png'
      , 'closed'  : 'images/thumb-up.png'
      , 'not-bug' : 'images/question-button.png'
      , 'solved'  : 'images/tick-button.png'
      , 'later'   : 'images/exclamation-button.png'
    };

    // reading ticket props
    ticket = ticketItemFactory( $container )
    history = [];

    // reading history items
    $history.each(function(index, item) {
        if( index === 0 ) return;
        history.push( historyItemFactory( $(this) ) );
    });

    // change page title
    $('title').text(function() {
      return extras.util.parse( '{id}: {summary}', ticket );
    });

    // change fav icon based on status
    $('link[type="image/x-icon"]').attr('href', function() {
      return chrome.extension.getURL( icons[ ticket.status ] );
    });

    extras.itemPage.history = history;
    extras.itemPage.ticket = ticket;
  }

  // expose to extras API
  // --------------------
  extras.itemPage.init = pageInit;

})( extras = extras || {}) ;