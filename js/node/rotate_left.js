var Rotate_left = enchant.Class.create(Terminal_symbol, {
  initialize: function() {
    Terminal_symbol.call(this, "rotate_left");
  },

  create_block: function(stage, x, y) {
    var rl = new Rotate_left();
    rl.set_image(this.image);
    rl.set_x(x);
    rl.set_y(y);
    rl.set_backgroundColor(this.backgroundColor);
    rl.register_move(stage);
    rl.register_append(stage);
    return rl;
  }
});