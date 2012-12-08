/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */

var obj = require('./obj');
var _ = require('lil_');

var arr = Object.create(Array.prototype);
_.eachIn(obj, function (name, value) {
  arr[name] = value;
});

module.exports = arr; 
