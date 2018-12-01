var Param = enchant.Class.create(Terminal_symbol, {
  initialize: function(id) {
    Terminal_symbol.call(this, "param");
    this.id = id;
  },
});