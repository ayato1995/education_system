var Func_id = enchant.Class.create(Terminal_symbol, {
  initialize: function(name, args) {
    Terminal_symbol.call(this, "func_id");
    this.name = name;
    this.args = args;
  },

  display: function() {
    console.log("type : " + this.type + " name : " + this.name);
  }
});