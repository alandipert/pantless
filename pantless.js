
exports.main = function(args) {
  require("./underscore");

  var compile = require("./pantless/compiler").compile,
      parse = require("./pantless/parser").parse,
      file = require("file"),
      i;

  for (i=1; i<args.length; i++)
    _.each(parse(file.read(args[i])), function(sexp) {
        var c = compile(sexp); if(c != "macro") print(JSON.stringify(c,null,2)+";"); 
    });
};
