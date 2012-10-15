var config = module.exports;

config["lilobj node tests"] = {
  rootPath: "../",
  env: "node",
  tests: [
    "test/*-test.js"
  ]
};

config["lilobj browser tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "node_modules/lilprovider/dist/lilprovider.js",
    "node_modules/lil_/dist/lil_.js",
    "lib/lilobj.js"
  ],
  tests: [
    "test/*-test.js"
  ]
};