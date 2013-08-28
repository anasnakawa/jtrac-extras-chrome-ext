'use strict';

// make sure extras object defined
var extras = extras || {};
extras.util = {};

// parse a given template and repalce any variables wrapped with brackets '{' & '}' with the
// corresponding object found in the passed context param
// * **param:** {string} template    sting template to be parsed
// * **param:** {object} context     object containing variables to inject into the template
//
// e.g: parse( 'hello my name is {name}, I am a {title}', { 
//      name: 'Anas Nakawa'
//      title: function() {
//          return 'software developer'
//      }
// });     
// >> 'hello my name is Anas Nakawa, I am a software developer'
extras.util.parse = function(template, context) {
  return template.replace(/{([A-Za-z0-9_$\-]*)}/g, function(token, match){
    if( !match in context ) {
      console.error( 'cannot find a variable with the name {match} in template {template}'.replace(/{match}/, match).replace(/{template}/, template) );
    }
    return ( typeof context[match] === 'function' ) ? context[match]() : context[match];
  });
}

// trim string
extras.util.trim = $.trim;