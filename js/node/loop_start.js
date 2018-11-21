var Loop_start = enchant.Class.create(Terminal_symbol, {
  initialize: function() {
    Terminal_symbol.call(this, "loop_start");
    this.n = 0;
  },

  inc_loop_n: function() {
    this.n++;
  },
});