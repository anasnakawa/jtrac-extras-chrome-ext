'use strict';

// make sure extras object defined
var extras = extras || {};
extras.listPage = {};

extras.listPage.init = function() {
  
  var self = this;
  
  // scaffolding classes into page
  $('.nav-header img').each(function() {
    var $self = $(this);
    console.log( $.trim( $self.parent().text().toLowerCase().replace(/ /g, '-') ) );
  });
  
  // this.userName = $('.nav-header img')
  
}
