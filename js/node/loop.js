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
    // is_touch : ブロックを削除するタイミングを管理
    this.is_touch = true;
  },

  create_block: function(stage, x, y, loop) {
    var l = new Loop();
    l.x = x;
    l.y = y;
    l.start.create_block(loop, stage);
    l.end.create_block(loop, stage);
    l.start.register_move(stage, l);
    l.start.register_append(stage, l);
    l.end.register_move(stage, l, l.start);
    l.end.register_append(stage, l, l.start);
    return l;
  },

  set_block: function(start_img, end_img, x, y, stage) {
    this.x = x;
    this.y = y;
    this.start.set_block(start_img, this.x, this.y, "blue", stage, this, this.end);
    this.end.set_block(start_img, this.x, this.y + this.start.height + 5, "yellow", stage, this, this.start);
    // this.register_move();
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

  delete: function() {
    this.start.delete();
    this.end.delete();
  },

  is_y_main_head_inside: function(prog, y) {
    var flag = prog.is_y_main_head_inside(this.start, y);
    console.log(flag);
    if (flag) {
      console.log(flag);
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
        console.log("fff");
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
        console.log("fff");
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
        console.log("fff");
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
        console.log("fff");
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
      this.height = (this.end.y + this.end.height) - this.start.y;
    });
  },
});