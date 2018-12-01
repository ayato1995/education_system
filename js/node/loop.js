var Loop = enchant.Class.create(enchant.Sprite, {
  initialize: function() {
    enchant.Sprite.call(this, 32, 32 * 2 + 5);
    this.x;
    this.y;
    this.start = new Loop_start();
    this.end = new Loop_end();
    this.height = this.start.height + this.end.height + 5;
    this.backgroundColor = "orange";
    this.register_height();
    // 移動前のブロックのx, y座標を保存
    this.keep_x;
    this.keep_y;
  },

  create_block: function(stage, x, y, loop) {
    var l = new Loop();
    l.x = x;
    l.y = y;
    l.start.create_block(loop, stage);
    l.end.create_block(loop, stage);
    l.start.register_move(stage, l);
    l.start.register_append(stage, l);
    l.start.register_above(stage, l);
    l.end.register_move(stage, l);
    l.end.register_append(stage, l);
    l.end.register_append(stage, l);
    return l;
  },

  set_block: function(start_img, end_img, x, y, stage) {
    this.x = x;
    this.y = y;
    this.start.set_block(start_img, this.x, this.y, "blue", stage, this, this.end);
    this.end.set_block(start_img, this.x, this.y + this.start.height + 5, "yellow", stage, this, this.start);
  },

  get_start_prev: function() {
    return this.start.prev;
  },

  get_start_next: function() {
    return this.start.next;
  },

  get_end_prev: function() {
    return this.end.prev;
  },

  get_end_next: function() {
    return this.end.next;
  },

  delete: function(node, prev) {
    var prev = this.start.prev;
    this.start.delete();
    this.end.delete();
    node.move(prev);
  },

  most_above: function(stage) {
    stage.addChild(this.start);
    stage.addChild(this.end);
  },

  remove_block: function(stage) {
    stage.removeChild(this);
    stage.removeChild(this.start);
    stage.removeChild(this.end);
  },

  loop_delete: function(node, e) {
    console.log("loop_delete");
    var start_prev = this.start.prev;
    var prev = node.prev;
    var next = node.next;
    if (prev != null && next != null) {
      if (node.type == "loop_start" && next.type == "loop_end") {
        if (next.next != null) {
          next = next.next;
        }
      }
      if (e.x > prev.x + prev.width + 5 ||
          e.x < prev.x - 5 || e.y < prev.y ||
          e.y > next.y + next.height) {
        this.delete(node, prev);
        return true;
      }
    }
    if (prev != null) {
      if (e.x > prev.x + prev.width + 5 ||
          e.x < prev.x - 5 || e.y < prev.y) {
        this.delete(node, prev);
        return true;
      }
    }
    node.move(start_prev);
    return false;
  },

  loop_append: function(stage, node, e) {
    console.log("loop_append");
    var prog = stage.prog;
    var start = this.start;
    var end = this.end;
    var start_y = start.y;
    var end_y = end.y;
    if (this.keep_x - 5 < this.x &&
        this.keep_x + this.width + 5 > this.x &&
        this.keep_y < this.y) {
      start_y = start.y - (start.height + 5) * 2;
      end_y = end.y - (end.height + 5) * 2;
    }
    if (prog.is_x_main_head_inside(e.x)) {
      if (prog.is_y_main_head_inside(start, start_y)) {
        if (!prog.is_y_main_head_inside(end, end_y)) {
          var prev = start.prev;
          start.delete();
          start.move(prev);
        } else {
          this.x = start.x;
          this.y = start.y;
          return true;
        }
      }
    }
    if (prog.is_x_s_head_inside(e.x)) {
      if (prog.is_y_s_head_inside(start, start_y)) {
        if (!prog.is_y_s_head_inside(end, end_y)) {
          var prev = node.prev;
          start.delete();
          start.move(prev);
        } else {
          this.x = start.x;
          this.y = start.y;
          return true;
        }
      }
    }
    if (prog.is_x_h_head_inside(e.x)) {
      if (prog.is_y_h_head_inside(start, start_y)) {
        if (!prog.is_y_h_head_inside(end, end_y)) {
          var prev = node.prev;
          start.delete();
          start.move(prev);
        } else {
          this.x = start.x;
          this.y = start.y;
          return true;
        }
      }
    }
    if (prog.is_x_d_head_inside(e.x)) {
      if (prog.is_y_d_head_inside(start, start_y)) {
        if (!prog.is_y_d_head_inside(end, end_y)) {
          var prev = node.prev;
          start.delete();
          start.move(prev);
        } else {
          this.x = start.x;
          this.y = start.y;
          return true;
        }
      }
    }
    if (prog.is_x_c_head_inside(e.x)) {
      if (prog.is_y_c_head_inside(start, start_y)) {
        if (!prog.is_y_c_head_inside(end, end_y)) {
          var prev = node.prev;
          start.delete();
          start.move(prev);
        } else {
          this.x = start.x;
          this.y = start.y;
          return true;
        }
      }
    }
  },

  is_y_main_head_inside: function(prog, y) {
    var flag = prog.is_y_main_head_inside(this.start, y);
    if (flag) {
      if (prog.is_y_main_head_inside(this.end, y + this.start.height + 5)) {
        return true;
      } else {
        this.start.delete();
      }
    }
    return false;
  },

  is_y_s_head_inside: function(prog, y) {
    var flag = prog.is_y_s_head_inside(this.start, y);
    if (flag) {
      console.log(flag);
      if (prog.is_y_s_head_inside(this.end, y + this.start.height + 5))
        return true;
      else {
        this.start.delete();
      }
    }
    return false;
  },

  is_y_h_head_inside: function(prog, y) {
    var flag = prog.is_y_h_head_inside(this.start, y);
    if (flag) {
      console.log(flag);
      if (prog.is_y_h_head_inside(this.end, y + this.start.height + 5))
        return true;
      else {
        this.start.delete();
      }
    }
    return false;
  },

  is_y_d_head_inside: function(prog, y) {
    var flag = prog.is_y_d_head_inside(this.start, y);
    if (flag) {
      console.log(flag);
      if (prog.is_y_d_head_inside(this.end, y + this.start.height + 5))
        return true;
      else {
        this.start.delete();
      }
    }
    return false;
  },

  is_y_c_head_inside: function(prog, y) {
    var flag = prog.is_y_c_head_inside(this.start, y);
    if (flag) {
      console.log(flag);
      if (prog.is_y_c_head_inside(this.end, y + this.start.height + 5))
        return true;
      else {
        this.start.delete();
      }
    }
    return false;
  },

  loop_addChild: function(stage) {
    stage.addChild(this);
    stage.addChild(this.start);
    stage.addChild(this.end);
  },

  register_height: function() {
    this.addEventListener("enterframe", function(e) {
      this.x = this.start.x;
      this.y = this.start.y;
      this.height = (this.end.y + this.end.height) - this.start.y;
    });
  },
});