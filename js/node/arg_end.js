var Arg_end = enchant.Class.create(Terminal_symbol, {
  initialize: function(arg) {
    Terminal_symbol.call(this, "arg_end");
    this.type = "arg_end";
    this.height = 16;
    this.set_x(arg.x);
    this.set_y(arg.y + this.height + 5);
  }
});