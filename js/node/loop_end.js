var Loop_end = enchant.Class.create(Terminal_symbol, {
  initialize: function() {
    Terminal_symbol.call(this, "loop_end");
  },

  set_block: function(img, x, y, color, prog, loop, start) {
    this.set_image(img);
    this.set_x(x);
    this.set_default_x(x);
    this.set_y(y);
    this.set_default_y(y);
    this.set_backgroundColor(color);
    this.register_move(loop, start);
    this.register_append(prog, loop, start);
  },

  register_move: function(loop, start) {
    this.addEventListener("touchmove", function(e) {
      if (this.prev != null || this.next != null) {
        if (this.x > this.prev.x + 32 || this.x < this.prev.x)  {
          this.delete();
        }
      }
      this.x = e.x;
      this.y = e.y;
      loop.x = e.x;
      loop.y = e.y - this.height - 5;
      start.x = e.x;
      start.y = e.y - this.height - 5;
    });
  },

  register_append: function(prog, loop, start) {
    this.addEventListener("touchend", function(e) {
      if (prog.is_x_main_head_inside(e.x)) {
        if (prog.is_y_main_head_inside(start, e.y) &&
            prog.is_y_main_head_inside(this, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      if (prog.is_x_s_head_inside(e.x)) {
        if (prog.is_y_s_head_inside(start, e.y) &&
            prog.is_y_s_head_inside(this, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      if (prog.is_x_h_head_inside(e.x)) {
        if (prog.is_y_h_head_inside(start, e.y) &&
            prog.is_y_h_head_inside(this, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      if (prog.is_x_d_head_inside(e.x)) {
        if (prog.is_y_d_head_inside(start, e.y) &&
            prog.is_y_d_head_inside(this, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      if (prog.is_x_c_head_inside(e.x)) {
        if (prog.is_y_c_head_inside(start, e.y) &&
            prog.is_y_c_head_inside(this, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      this.x = this.default_x;
      this.y = this.default_y;
      loop.x = loop.default_x;
      loop.y = loop.default_y;
      start.x = start.default_x;
      start.y = start.default_y;
    });
  }

});