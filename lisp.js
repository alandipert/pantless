/* Jison generated parser */
var lisp = (function(){
var parser = {trace: 
function trace() {
}
,
yy: {},
symbols_: {"error":2,"prg":3,"exprs":4,"EOF":5,"expr":6,"literal":7,"LP":8,"expr_list":9,"RP":10,"LB":11,"RB":12,"THING":13,"QUOTED":14,"$accept":0,"$end":1},
terminals_: {"2":"error","5":"EOF","8":"LP","10":"RP","11":"LB","12":"RB","13":"THING","14":"QUOTED"},
productions_: [0,[3,2],[6,1],[6,3],[6,3],[4,1],[4,2],[9,1],[9,2],[7,1],[7,1]],
performAction: 
function anonymous(yytext, yyleng, yylineno, yy) {
    var $$ = arguments[5], $0 = arguments[5].length;
    switch (arguments[4]) {
      case 1:
        return $$[$0 - 2 + 1 - 1];
        break;
      case 3:
        this.$ = $$[$0 - 3 + 2 - 1];
        break;
      case 4:
        this.$ = $$[$0 - 3 + 2 - 1];
        break;
      case 5:
        this.$ = [$$[$0 - 1 + 1 - 1]];
        break;
      case 6:
        this.$ = $$[$0 - 2 + 1 - 1].concat([$$[$0 - 2 + 2 - 1]]);
        break;
      case 7:
        this.$ = [$$[$0 - 1 + 1 - 1]];
        break;
      case 8:
        this.$ = $$[$0 - 2 + 1 - 1].concat([$$[$0 - 2 + 2 - 1]]);
        break;
      case 9:
        var n = new Number($$[$0 - 1 + 1 - 1]);
        this.$ = (n !== NaN) ? n : $$[$0 - 1 + 1 - 1];
        break;
    }
}
,
table: [{"3":1,"4":2,"6":3,"7":4,"8":[1,5],"11":[1,6],"13":[1,7],"14":[1,8]},{"1":[3]},{"5":[1,9],"6":10,"7":4,"8":[1,5],"11":[1,6],"13":[1,7],"14":[1,8]},{"5":[2,5],"13":[2,5],"14":[2,5],"8":[2,5],"11":[2,5]},{"5":[2,2],"11":[2,2],"8":[2,2],"14":[2,2],"13":[2,2],"10":[2,2],"12":[2,2]},{"9":11,"6":12,"7":4,"8":[1,5],"11":[1,6],"13":[1,7],"14":[1,8]},{"9":13,"6":12,"7":4,"8":[1,5],"11":[1,6],"13":[1,7],"14":[1,8]},{"5":[2,9],"13":[2,9],"14":[2,9],"8":[2,9],"11":[2,9],"10":[2,9],"12":[2,9]},{"5":[2,10],"13":[2,10],"14":[2,10],"8":[2,10],"11":[2,10],"10":[2,10],"12":[2,10]},{"1":[2,1]},{"5":[2,6],"13":[2,6],"14":[2,6],"8":[2,6],"11":[2,6]},{"10":[1,14],"6":15,"7":4,"8":[1,5],"11":[1,6],"13":[1,7],"14":[1,8]},{"10":[2,7],"13":[2,7],"14":[2,7],"8":[2,7],"11":[2,7],"12":[2,7]},{"12":[1,16],"6":15,"7":4,"8":[1,5],"11":[1,6],"13":[1,7],"14":[1,8]},{"5":[2,3],"11":[2,3],"8":[2,3],"14":[2,3],"13":[2,3],"10":[2,3],"12":[2,3]},{"10":[2,8],"13":[2,8],"14":[2,8],"8":[2,8],"11":[2,8],"12":[2,8]},{"5":[2,4],"11":[2,4],"8":[2,4],"14":[2,4],"13":[2,4],"10":[2,4],"12":[2,4]}],
defaultActions: {"9":[2,1]},
parseError: 
function parseError(str, hash) {
    throw new Error(str);
}
,
parse: 
function parse(input) {
    var self = this, stack = [0], vstack = [null], table = this.table, yytext = "", yylineno = 0, yyleng = 0, shifts = 0, reductions = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    var parseError = this.yy.parseError = typeof this.yy.parseError == "function" ? this.yy.parseError : this.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
    }
    function checkRecover(st) {
        for (var p in table[st]) {
            if (p == TERROR) {
                return true;
            }
        }
        return false;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token];
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected, recovered = false;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null) {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            if (!recovering) {
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                }
                if (this.lexer.showPosition) {
                    parseError.call(this, "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", "), {text:this.lexer.match, token:this.terminals_[symbol] || symbol, line:this.lexer.yylineno, expected:expected});
                } else {
                    parseError.call(this, "Parse error on line " + (yylineno + 1) + ": Unexpected '" + this.terminals_[symbol] + "'", {text:this.lexer.match, token:this.terminals_[symbol] || symbol, line:this.lexer.yylineno, expected:expected});
                }
            }
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw "Parsing halted.";
                }
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                symbol = lex();
            }
            while (1) {
                if (checkRecover(state)) {
                    break;
                }
                if (state == 0) {
                    throw "Parsing halted.";
                }
                popStack(1);
                state = stack[stack.length - 1];
            }
            preErrorSymbol = symbol;
            symbol = TERROR;
            state = stack[stack.length - 1];
            action = table[state] && table[state][TERROR];
            recovering = 3;
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        a = action;
        switch (a[0]) {
          case 1:
            shifts++;
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            stack.push(a[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
          case 2:
            reductions++;
            len = this.productions_[a[1]][1];
            yyval.$ = vstack[vstack.length - len];
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, a[1], vstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[a[1]][0]);
            vstack.push(yyval.$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            this.reductionCount = reductions;
            this.shiftCount = shifts;
            return true;
        }
    }
    return true;
}
};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:"",
parseError:
function parseError(str, hash) {
    if (this.yy.parseError) {
        this.yy.parseError(str, hash);
    } else {
        throw new Error(str);
    }
}
,
setInput:
function (input) {
    this._input = input;
    this._more = this._less = this.done = false;
    this.yylineno = this.yyleng = 0;
    this.yytext = this.matched = this.match = "";
    return this;
}
,
input:
function () {
    var ch = this._input[0];
    this.yytext += ch;
    this.yyleng++;
    this.match += ch;
    this.matched += ch;
    var lines = ch.match(/\n/);
    if (lines) {
        this.yylineno++;
    }
    this._input = this._input.slice(1);
    return ch;
}
,
unput:
function (ch) {
    this._input = ch + this._input;
    return this;
}
,
more:
function () {
    this._more = true;
    return this;
}
,
pastInput:
function () {
    var past = this.matched.substr(0, this.matched.length - this.match.length);
    return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
}
,
upcomingInput:
function () {
    var next = this.match;
    if (next.length < 20) {
        next += this._input.substr(0, 20 - next.length);
    }
    return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
}
,
showPosition:
function () {
    var pre = this.pastInput();
    var c = new Array(pre.length + 1).join("-");
    return pre + this.upcomingInput() + "\n" + c + "^";
}
,
next:
function () {
    if (this.done) {
        return this.EOF;
    }
    if (!this._input) {
        this.done = true;
    }
    var token, match, lines;
    if (!this._more) {
        this.yytext = "";
        this.match = "";
    }
    for (var i = 0; i < this.rules.length; i++) {
        match = this._input.match(this.rules[i]);
        if (match) {
            lines = match[0].match(/\n/g);
            if (lines) {
                this.yylineno += lines.length;
            }
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, i);
            if (token) {
                return token;
            } else {
                return;
            }
        }
    }
    if (this._input == this.EOF) {
        return this.EOF;
    } else {
        this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {text:"", token:null, line:this.yylineno});
    }
}
,
lex:
function () {
    var r = this.next();
    if (typeof r !== "undefined") {
        return r;
    } else {
        return this.lex();
    }
}
});
lexer.performAction = 
function anonymous(yy, yy_) {
    switch (arguments[2]) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        return 8;
        break;
      case 3:
        return 10;
        break;
      case 4:
        return 11;
        break;
      case 5:
        return 12;
        break;
      case 6:
        var i, c, d, ret = "", tex = yy_.yytext;
        while (yy.lexer._input.length > 0 && (c = yy.lexer.input()) !== "\"") {
            ret += (c === "\\" && ((d = yy.lexer.input()) === "\\" || d === "\"") ? d : ((c === "\\") ? (c + d) : c));
        }
        if (c !== "\"") {
            for (i = ret.length - 1; i >= 0; i--) {
                if (ret.charAt(i) !== "\"") {
                    yy.lexer.unput(ret.charAt(i));
                }
            }
        }
        ret = (c !== "\"" ? "\"" : ret);
        yy_.yytext = ret;
        return (c !== "\"" ? "\"" : "QUOTED");
        break;
      case 7:
        return 13;
        break;
      case 8:
        return 5;
        break;
    }
}
;
lexer.rules = [/^[\s,]+/,/^[;].*$/,/^[\(]/,/^[\)]/,/^[\[]/,/^[\]]/,/^["]/,/^[^\s,()\[\]]+/,/^$/];return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined') {
exports.parser = lisp;
exports.parse = function () { return lisp.parse.apply(lisp, arguments); }
exports.main = 
function commonjsMain(args) {
    var cwd = require("file").path(require("file").cwd());
    if (!args[1]) {
        throw new Error("Usage: " + args[0] + " FILE");
    }
    var source = cwd.join(args[1]).read({charset:"utf-8"});
    exports.parser.parse(source);
}

if (require.main === module) {
	exports.main(require("system").args);
}
}
