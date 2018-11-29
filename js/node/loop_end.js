var Loop_end = enchant.Class.create(Terminal_symbol, {
  initialize: function() {
    Terminal_symbol.call(this, "loop_end");
  },

  create_block: function(loop, stage) {
    this.set_image(loop.end.image);
    this.set_x(loop.end.x);
    this.set_y(loop.y + loop.height - this.height);
    this.set_backgroundColor(loop.end.backgroundColor);
  },

  set_block: function(img, x, y, color, stage, loop, start) {
    this.set_image(img);
    this.set_x(x);
    this.set_y(y);
    this.set_backgroundColor(color);
    this.register_init_move(stage, loop);
    this.register_init_append(stage);
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
      node.y = e.y - this.height - 5;
      node.start.x = e.x;
      node.start.y = e.y - this.height - 5;
      node.end.x = e.x;
      node.end.y = e.y;
    });
  },

  register_init_append: function(stage) {
    this.addEventListener("touchend", function(e) {
      console.log("init_block_append : " + this.node.end.type);
      stage.is_touch = true;
      var prog = stage.prog;
      if (prog.is_x_main_head_inside(e.x)) {
        if (this.node.is_y_main_head_inside(prog, e.y)) {
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
    });
  },

  register_move: function(stage, loop) {
    this.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      loop.x = e.x;
      loop.y = e.y - this.height - 5;
      loop.start.x = e.x;
      loop.start.y = e.y - this.height - 5;
    });
  },

  register_append: function(stage, loop) {
    this.addEventListener("touchend", function(e) {
      if (!loop.loop_delete(this, e)) {
        return false;
      }
      if (loop.loop_append(stage, this, e)) {
        return true;
      }
      stage.removeChild(loop.start);
      stage.removeChild(this);
      stage.removeChild(loop);
      return false;
    });
  }
});