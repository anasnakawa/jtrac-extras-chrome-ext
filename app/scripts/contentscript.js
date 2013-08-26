'use strict';

if( ~window.location.href.indexOf('ItemListPage') ) {
  extras.listPage.init();
} else if( ~window.location.href.indexOf('jtrac/app/item') ) {
  extras.itemPage.init();
}

console.dir( chrome.browsingData );
