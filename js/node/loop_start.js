var Loop_start = enchant.Class.create(Terminal_symbol, {
  initialize: function() {
    Terminal_symbol.call(this, "loop_start");
    this.n = 0;
  },

  create_block: function(loop, stage) {
    this.set_image(loop.start.image);
    this.set_x(loop.start.x);
    this.set_y(loop.start.y);
    this.set_n(loop.start.n);
    this.set_backgroundColor(loop.start.backgroundColor);
  },

  set_block: function(img, x, y, color, stage, loop, end) {
    this.set_image(img);
    this.set_x(x);
    this.set_y(y);
    this.set_backgroundColor(color);
    this.register_init_move(stage, loop);
    this.register_init_append(stage);
  },

  set_n: function(n) {
    this.n = n;
  },

  inc_loop_n: function() {
    this.n++;
  },

  register_init_move: function(stage, loop) {
    this.addEventListener("touchmove", function(e) {
      var node = this.node;
      if (stage.is_touch) {
        node = loop.create_block(stage, e.x, e.y, loop);
        stage.addChild(node);
        stage.addChild(node.start);
        stage.addChild(node.end);
        this.node = node;
        stage.is_touch = false;
      }
      node.x = e.x;
      node.y = e.y;
      node.start.x = e.x;
      node.start.y = e.y;
      node.end.x = e.x;
      node.end.y = e.y + this.height + 5;
    })
  },

  register_init_append: function(stage) {
    this.addEventListener("touchend", function(e) {
      console.log("init_block_append : " + this.node.start.type);
      stage.is_touch = true;
      var prog = stage.prog;
      if (prog.is_x_main_head_inside(e.x)) {
        if (this.node.is_y_main_head_inside(prog, e.y)) {
          // prog.debug()
          this.node.x = this.node.start.x;
          this.node.y = this.node.start.y;
          return true;
        }
      }
      if (prog.is_x_s_head_inside(e.x)) {
        if (this.node.is_y_s_head_inside(prog, e.y)) {
          this.node.x = this.node.start.x;
          this.node.y = this.node.start.y;
          return true;
        }
      }
      if (prog.is_x_h_head_inside(e.x)) {
        if (this.node.is_y_h_head_inside(prog, e.y)) {
          this.node.x = this.node.start.x;
          this.node.y = this.node.start.y;
          return true;
        }
      }
      if (prog.is_x_d_head_inside(e.x)) {
        if (this.node.is_y_d_head_inside(prog, e.y)) {
          this.node.x = this.node.start.x;
          this.node.y = this.node.start.y;
          return true;
        }
      }
      if (prog.is_x_c_head_inside(e.x)) {
        if (this.node.is_y_c_head_inside(prog, e.y)) {
          this.node.x = this.node.start.x;
          this.node.y = this.node.start.y;
          return true;
        }
      }
      stage.removeChild(this.node);
      stage.removeChild(this.node.start);
      stage.removeChild(this.node.end);
      return false;
    });
  },

  register_above: function(stage, loop) {
    this.addEventListener("touchstart", function() {
      loop.most_above(stage);
      loop.keep_y = loop.y;
      loop.keep_x = loop.x;
    });
  },

  register_move: function(stage, loop) {
    this.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      loop.x = e.x;
      loop.y = e.y;
      loop.end.x = e.x;
      loop.end.y = e.y + this.height + 5;
    });
  },

  register_append: function(stage, loop) {
    this.addEventListener("touchend", function(e) {
      console.log("loop_start register_append");
      if (!loop.loop_delete(this, e)) {
        stage.prog.debug();
        return false;
      }
      if (loop.loop_append(stage, this, e)) {
        return true;
      }
      loop.remove_block(stage);
      return false;
    });
  }
});