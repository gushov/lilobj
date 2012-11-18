# lilobj

A li'l object inheritance sugar.

## Documentation

### extends(properties)

Returns new object with the prototype of the caller and the given properties.

### creates(args...)

Returns new object with the prototype of the caller and invokes the construct method with args

## Browser usage

load dist/lilobj.js or dist/lilobj.min.js in you browser and call it like this:

```javascript
(function () {

  var lilobj = require('lilobj');

  var beer = lilobj.extend({
    construct: function (hops, malt, yeast) {
      this.hops = hops;
      this.malt = malt;
      this.yeast = yeast; 
    }
  });

  var ale = beer.create('cascade', 'two-row', 1056);

}());
```

## Node usage

Install via npm: `npm install lilobj`

```javascript
var lilobj = require('lilobj');

var beer = lilobj.extend({
  construct: function (hops, malt, yeast) {
    this.hops = hops;
    this.malt = malt;
    this.yeast = yeast; 
  }
});

var ale = beer.create('cascade', 'two-row', 1056);
```

## License
Copyright (c) 2012 August Hovland
Licensed under the MIT license.