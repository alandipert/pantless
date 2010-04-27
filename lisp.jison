
%lex

%%

[\s,]+                { /* nothing */ }
[;].*$                { /* nothing */ }
[\(]                  { return 'LP'; }
[\)]                  { return 'RP'; }
[\[]                  { return 'LB'; }
[\]]                  { return 'RB'; }
["] {
  var i, c, d, ret = "", tex = yytext;
  while (yy.lexer._input.length > 0 && (c = yy.lexer.input()) !== '"')
    ret += (c === '\\' && ((d = yy.lexer.input()) === '\\' || d === '"') 
      ? d 
      : ((c === '\\') 
        ? (c+d) 
        : c)
    ); 
  if (c !== '"')
    for (i=ret.length-1; i>=0; i--)
      if (ret.charAt(i) !== '"')
        yy.lexer.unput(ret.charAt(i))
  ret = (c !== '"' ? '"' : ret);
  yytext = ret;
  return (c !== '"' ? '"' : 'QUOTED');
}
[^\s,()\[\]]+         { return 'THING'; }
<<EOF>>               { return 'EOF'; }

/lex

%%

prg
  : exprs EOF
    { return $1; }
  ;

expr
  : literal
  | LP expr_list RP
    { $$ =  $2; }
  | LB expr_list RB
    { $$ =  $2; }
  ;

exprs
  : expr
    { $$ = [ $1 ]; }
  | exprs expr
    { $$ = $1.concat([ $2 ]); }
  ;

expr_list
  : expr
    { $$ = [ $1 ]; }
  | expr_list expr
    { $$ = $1.concat([ $2 ]); }
  ;

literal 
  : THING {
      var n = new Number($1);
      $$ = (n !== NaN) ? n : $1;
    }
  | QUOTED ;

