var Param = enchant.Class.create(Terminal_symbol, {
  initialize: function(id) {
    Terminal_symbol.call(this, "param");
    this.id = id;
  },

  create_block: function(stage, x, y) {
    var p = new Param(this.id);
    p.set_x(x);
    p.set_y(y);
    p.set_backgroundColor(this.backgroundColor);
    p.register_move(stage);
    p.register_append(stage);
    p.register_above(stage);
    return p;
  },

  block_append: function(stage, e) {
    if (prog.is_x_s_head_inside(e.x)) {
      if (prog.is_y_s_head_inside(this, e.y)) {
        return true;
      }
    }
    if (prog.is_x_h_head_inside(e.x)) {
      if (prog.is_y_h_head_inside(this, e.y)) {
        return true;
      }
    }
    if (prog.is_x_d_head_inside(e.x)) {
      if (prog.is_y_d_head_inside(this, e.y)) {
        return true;
      }
    }
    if (prog.is_x_c_head_inside(e.x)) {
      if (prog.is_y_c_head_inside(this, e.y)) {
        return true;
      }
    }
    return false;
  }
});