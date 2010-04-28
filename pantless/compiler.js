var infix = ['+', '-', '*', '/', '<', '>', '<=', '>=', '==', '||'];
var macros = [];
var defs = [];

var forms = {
  // define a function for operating on code data. the data is transformed and outputted at compile time. 
  'defmacro': function(name, arglist, body) {
    var macro = forms['def'](name, forms['fn'](arglist, JSON.stringify(body)));
    _.each(arglist, function(arg) {
      macro = macro.replace('"'+arg+'"', arg);
    });
    macros.push(name);
    eval(macro);
    return "macro";
  },
  // an array composed of its compiled members
  'array': function() {
    return _.reduce(arguments, [], function(xs, y) { xs.push(compile(y)); return xs; });
  },
  // return the value
  'quote': function(body) {
    return body;
  },
  // nested ternary. if arguments.length is odd, default is null
  'cond': function() {
    return _.map(_.partition(arguments, 2), function(pair) {
               return compile(pair[0]) + " ? " + compile(pair[1]) + " : \n";
             }).join('') + (arguments.length % 2 == 0 ? "null" : compile(_.last(arguments)));
  },
  // "global" definition
  'def': function(name, body) {
    defs.push(name);
    return name + " = " + compile(body);
  },
  // function
  'fn': function(arglist, body) {
    return "function("+arglist.join(",")+") {\n return " + compile(body) + ";\n}";
  },
  // if statement
  'if': function(test, if_true, if_false) {
    return compile(test) + " ? " + compile(if_true) + " : " + compile(if_false);
  }
};

function compile(exp) {
  if(_.isArray(exp)) {
    var first = _.first(exp);
    var rest = _.rest(exp);
    // macros: compile a function that manipulates data.  manipulate it, and compile result.
    if(_.include(macros, first)) {
      return compile(compile(eval(first + "(" + _.map(rest, function(x) { return JSON.stringify(x); }) + ")")));
    // infix operators: convert prefix to infix for operators named in 'infix'
    } else if(_.include(infix, first)) {
      return _.map(rest, compile).join(first);
    // natively implemented functions 
    } else if(_.include(_.keys(forms), first)) {
      return forms[first].apply(this, rest);
    // anonymous functions
    } else if(_.isArray(first)) {
      return compile(first) + "(" + _.map(rest, compile).join(',') + ")";
    // user-defined functions 
    } else {
      return first + "(" + _.map(rest, function(x) { 
        return _.isString(x) && !_.include(defs,x) ? JSON.stringify(compile(x)) : compile(x); 
        //return compile(x);
      }).join(',') + ")";
    }
  } else {
    // literals
    return exp;
  }
}

exports.compile = compile;
