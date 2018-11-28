var Loop_start = enchant.Class.create(Terminal_symbol, {
  initialize: function() {
    Terminal_symbol.call(this, "loop_start");
    this.n = 0;
  },

  set_block: function(img, x, y, color, prog, loop, end) {
    this.set_image(img);
    this.set_x(x);
    this.set_default_x(x);
    this.set_y(y);
    this.set_default_y(y);
    this.set_backgroundColor(color);
    this.register_move(loop, end);
    this.register_append(prog, loop, end);
  },

  inc_loop_n: function() {
    this.n++;
  },

  register_move: function(loop, end) {
    this.addEventListener("touchmove", function(e) {
      if (this.prev != null || this.next != null) {
        if (this.x > this.prev.x + 32 || this.x < this.prev.x)  {
          this.delete();
        }
      }
      this.x = e.x;
      this.y = e.y;
      loop.x = e.x;
      loop.y = e.y;
      end.x = e.x;
      end.y = e.y + this.height + 5;
    });
  },

  register_append: function(prog, loop, end) {
    this.addEventListener("touchend", function(e) {
      if (prog.is_x_main_head_inside(e.x)) {
        if (prog.is_y_main_head_inside(this, e.y) &&
            prog.is_y_main_head_inside(end, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      if (prog.is_x_s_head_inside(e.x)) {
        if (prog.is_y_s_head_inside(this, e.y) &&
            prog.is_y_s_head_inside(end, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      if (prog.is_x_h_head_inside(e.x)) {
        if (prog.is_y_h_head_inside(this, e.y) &&
            prog.is_y_h_head_inside(end, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      if (prog.is_x_d_head_inside(e.x)) {
        if (prog.is_y_d_head_inside(this, e.y) &&
            prog.is_y_d_head_inside(end, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      if (prog.is_x_c_head_inside(e.x)) {
        if (prog.is_y_c_head_inside(this, e.y) &&
            prog.is_y_c_head_inside(end, e.y)) {
          loop.x = this.x;
          loop.y = this.y;
          return true;
        }
      }
      this.x = this.default_x;
      this.y = this.default_y;
      loop.x = loop.default_x;
      loop.y = loop.default_y;
      end.x = end.default_x;
      end.y = end.default_y;
    })
  }
});