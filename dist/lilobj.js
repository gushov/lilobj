/*! lilobj - v0.0.4 - 2012-12-08
 * Copyright (c) 2012 August Hovland <gushov@gmail.com>; Licensed MIT */

(function (ctx) {

  "use strict";

  var defined = {};
  var exported = {};

  function resolve(from, name) {

    if (name.indexOf('.') === -1) {
      return name;
    }

    name = name.split('/');
    from = from ? from.split('/') : [];
    from.pop();

    if (name[0] === '.') {
      name.shift();
    }

    while(name[0] === '..') {
      name.shift();
      from.pop();
    }

    return from.concat(name).join('/');

  }

  //@TODO handle provide/require/define already in scope

  ctx.provide = function (name, module, isDefinition) {

    if (isDefinition) {
      return defined[name] = module;
    } else {
      return exported[name] = module;
    }

  };

  ctx.require = function (path, canonical) {

    var exports, module;
    var name = canonical || path;

    if (exported[name]) {
      return exported[name];
    } else {

      exports = exported[name] = {};
      module = { exports: exports };
      defined[name](function (path) {
        return ctx.require(path, resolve(name, path));
      }, module, exports);

      return (exported[name] = module.exports);

    }

  };

}(this));
 
provide('lil_', function (require, module, exports) {

/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */

module.exports = {

  typeOf: function (x) {

    var type = typeof x;

    if (type === 'object') {
      type = Array.isArray(x) ? 'array' : type;
      type = x === null ? 'null' : type;
    }

    return type;

  },

  each: function (arr, func, ctx) {

    if (arr && arr.length) {
      arr.forEach(func, ctx);
    }

  },

  every: function (arr, func, ctx) {

    if (arr && arr.length) {
      return arr.every(func, ctx);
    }
    return false;

  },

  map: function (arr, func, ctx) {

    if (arr && arr.length) {
      return arr.map(func, ctx);
    }
    return [];

  },

  eachIn: function (obj, func, ctx) {

    var keys = obj ? Object.keys(obj) : [];

    keys.forEach(function (name, i) {
      func.call(ctx, name, obj[name], i);
    });

  },

  mapIn: function (obj, func, ctx) {

    var result = {};

    this.eachIn(obj, function (name, obj, i) {
      result[name] = func.call(this, name, obj, i);
    }, ctx);

    return result;

  },

  walk: function (target, source, func, fill) {

    var self = this;

    var walkObj = function (target, source) {

      self.eachIn(source, function (name, obj) {
        step(target[name], obj, name, target);
      });

    };

    var step = function (target, source, name, parent) {

      var type = self.typeOf(source);

      if (type === 'object') {

        if (!target && parent && fill) {
          target = parent[name] = {};
        }
        
        walkObj(target, source);

      } else {
        func.call(parent, target, source, name);
      }

    };

    step(target, source);

  },

  extend: function (obj, src) {

    this.walk(obj, src, function (target, src, name) {
      this[name] = src;
    }, true);

    return obj;

  },

  defaults: function (obj, defaults) {

    this.walk(obj, defaults, function (target, src, name) {

      if (!target) {
        this[name] = src;
      }

    }, true);

    return obj;

  },

  match: function (obj, test) {

    var isMatch = true;

    this.walk(obj, test, function (target, src) {
      isMatch = (target === src);
    });

    return isMatch;

  },

  pick: function(obj, keys) {

    var picked = {};
    keys = this.typeOf(keys) === 'array' ? keys : Object.keys(keys);

    this.each(keys, function (key) {
      picked[key] = obj && obj[key];
    });

    return picked;

  },

  pushOn: function (obj, prop, value) {

    if (obj[prop] && typeof obj[prop].push === 'function') {
      obj[prop].push(value);
    } else if ( typeof obj[prop] === 'undefined' ) {
      obj[prop] = [value];
    }

  }

};

}, true);

provide('lilobj/arr', function (require, module, exports) {

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


}, true);
provide('lilobj/obj', function (require, module, exports) {

/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */

var _ = require('lil_');

module.exports = {

  isA: function (prototype) {

    function D() {}
    D.prototype = prototype;
    return this instanceof D;

  },

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


}, true);
provide('lilobj', function (require, module, exports) {

/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */

var obj = require('./lilobj/obj');
var arr = require('./lilobj/arr');

module.exports = {
  obj: obj,
  arr: arr
};


}, true);
