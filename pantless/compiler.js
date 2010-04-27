var infix = ['+', '-', '*', '/', '<', '>', '<=', '>=', '=='];
var macros = [];
var defs = [];

var forms = {
  'defmacro': function(name, arglist, body) {
    var macro = forms['def'](name, forms['fn'](arglist, JSON.stringify(body)));
    _.each(arglist, function(arg) {
      macro = macro.replace('"'+arg+'"', arg);
    });
    macros.push(name);
    eval(macro);
    return "macro";
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
    defs.push(name);
    return name + " = " + compile(body);
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
        return _.isString(x) && !_.include(defs,x) ? JSON.stringify(compile(x)) : compile(x); 
      }).join(',') + ")";
    }
  } else {
    return exp;
  }
}

exports.compile = compile;
