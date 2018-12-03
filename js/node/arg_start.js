var Arg_start = enchant.Class.create(Terminal_symbol, {
  initialize: function(id) {
    Terminal_symbol.call(this, "arg_start");
    this.type = "arg_start";
    this.id = id;
  },

  get_id: function() {
    return this.id;
  },
});