var Arg_start = enchant.Class.create(Terminal_symbol, {
  initialize: function(id, arg) {
    Terminal_symbol.call(this, "arg_start");
    this.type = "arg_start";
    this.id = id;
    this.set_x(arg.x);
    this.set_y(arg.y);
  },

  get_id: function() {
    return this.id;
  },
});