/*! lilobj - v0.0.0 - 2012-10-15
 * Copyright (c) 2012 August Hovland <gushov@gmail.com>; Licensed MIT */

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