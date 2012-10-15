/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */
/*global provide */

(function (provide) {

  var _ = require('lil_', 'lil_');

  var LilObj = {

    extend: function (props) {

      var result = Object.create(this);

      _.eachIn(props, function (name, value) {
        result[name] = value;
      });

      return result;

    },

    create: function () {

      var object = Object.create(this);

      if (object.construct !== undefined) {
        object.construct.apply(object, arguments);
      }

      return object;

    }

  };

  provide('lilobj', LilObj);

}(typeof module !== 'undefined' ?
    function (a, b) { module.exports = b; } :
    provide));