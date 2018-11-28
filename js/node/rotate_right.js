var Rotate_right = enchant.Class.create(Terminal_symbol, {
  initialize: function() {
    Terminal_symbol.call(this, "rotate_right");
  },

  create_block: function(stage, x, y) {
    var rr = new Up();
    rr.set_image(this.image);
    rr.set_x(x);
    rr.set_y(y);
    rr.set_backgroundColor(this.backgroundColor);
    rr.register_move(stage);
    rr.register_append(stage);
    return rr;
  }
});