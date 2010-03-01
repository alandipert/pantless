load(["lib/underscore.js"]);
load(["lib/json2.js"]);

var infix = ['+', '-', '*', '/', '<', '>', '<=', '>='];
var macros = [];

var forms = {
  'defmacro': function(name, arglist, body) {
    var macro = forms['def'](name, forms['fn'](arglist, JSON.stringify(body)));
    _.each(arglist, function(arg) {
      macro = macro.replace('"'+arg+'"', arg);
    });
    macros.push(name);
    eval(macro);
    return macro;
  },
  'array':     function() {
    return _.reduce(arguments, [], function(xs, y) { xs.push(compile(y)); return xs; });
  },
  'quote':    function(body) {
    return body;
  },
  'cond':     function() {
    return _.map(_.partition(arguments, 2), function(pair) {
               return compile(pair[0]) + " ? " + compile(pair[1]) + " : \n";
             }).join('') + "null";
  },
  'def':      function(name, body) {
    return name + " = " + compile(body) + ";";
  },
  'fn':       function(arglist, body) {
    return "function("+arglist.join(",")+") {\n return " + compile(body) + ";\n}";
  },
  'if':       function(test, if_true, if_false) {
    return compile(test) + " ? " + compile(if_true) + " : " + compile(if_false);
  }
};

function compile(exp) {
  if(_.isArray(exp)) {
    var first = _.first(exp);
    var rest = _.rest(exp);
    if(_.include(macros, first)) {
      return compile(compile(eval(first + "(" + _.map(rest, function(x) { return JSON.stringify(x); }) + ")")));
    } else if(_.include(infix, first)) {
      return _.map(rest, compile).join(first);
    } else if(_.include(_.keys(forms), first)) {
      return forms[first].apply(this, rest);
    } else {
      return first + "(" + _.map(rest, function(x) { 
        return _.isString(x) ? JSON.stringify(compile(x)) : compile(x); 
      }).join(',') + ")";
    }
  } else {
    return exp;
  }
}

_.each([

  ['defmacro', 'defn', ['name', 'args', 'body'],
    ['array', ['quote', 'def'], 'name', ['array', ['quote', 'fn'], ['quote', 'args'], 'body']]],

  ['defn', 'fact', ['n'],
    ['if', ['<=', 'n', 2],
      'n',
      ['*', 'n', ['fact', ['-', 'n', 1]]]]],

  ['defmacro', 'unless', ['expr', 'form'],
    ['array', ['quote', 'if'], 'expr', null, 'form']],

  ['defn', 'test_unless1', [],
    ['unless', false, ['print', "this should print"]]],

  ['defn', 'test_unless2', [],
    ['unless', true, ['print', "this should not print"]]],

  ['print', ['fact', 5]],

  ['test_unless1'],

  ['test_unless2']

], function(sexp) { print(compile(sexp)); });
