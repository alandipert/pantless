
exports.main = function(args) {
  require("./underscore");

  var compile = require("./pantless/compiler").compile,
      parse = require("./pantless/parser").parse,
      file = require("file"),
      i;

  for (i=1; i<args.length; i++)
    print(JSON.stringify(parse(file.read(args[i])),null,2));
};
