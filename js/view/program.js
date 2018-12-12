var Prog = enchant.Class.create({
  initialize: function() {
    this.main_head = new Terminal_symbol("head");
    this.set_head(this.main_head, 200, 10);
    this.main_space = this.create_space(this.main_head, this.main_head.width + 10, 300 - (this.main_head.y + this.main_head.height), "gray");
    this.s_head = new Terminal_symbol("head");
    this.set_head(this.s_head, 245, 10);
    this.s_space = this.create_space(this.s_head, this.s_head.width + 10, 300 - (this.s_head.y + this.s_head.height), "skyblue");
    this.h_head = new Terminal_symbol("head");
    this.set_head(this.h_head, 290, 10);
    this.h_space = this.create_space(this.h_head, this.h_head.width + 10, 300 - (this.h_head.y + this.h_head.height), "skyblue");
    this.d_head = new Terminal_symbol("head");
    this.set_head(this.d_head, 335, 10);
    this.d_space = this.create_space(this.d_head, this.d_head.width + 10, 300 - (this.d_head.y + this.d_head.height), "skyblue");
    this.c_head = new Terminal_symbol("head");
    this.set_head(this.c_head, 380, 10);
    this.c_space = this.create_space(this.c_head, this.c_head.width + 10, 300 - (this.c_head.y + this.c_head.height), "skyblue");
  },

  set_head: function(head, x, y) {
    head.set_x(x);
    head.set_y(y);
    head.set_backgroundColor("yellow");
  },

  get_total_height: function() {
    return this.main_space.height;
  },

  create_space: function(head, width, height, color) {
    var space = new Sprite(width, height);
    space.type = "space";
    space.backgroundColor = color;
    space.x = head.x - 5;
    space.y = head.y + head.height;
    return space;
  },

  move_blocks: function() {
    this.move_block(this.main_head, this.main_space);
    this.move_block(this.s_head, this.s_space);
    this.move_block(this.h_head, this.h_space);
    this.move_block(this.d_head, this.d_space);
    this.move_block(this.c_head, this.c_space);
  },

  move_block: function(head, space) {
    head.y = space.y + space.height + 10;
    space.y = head.y + head.height;
    head.move(head);
  },

  copy_blocks: function(stage, head, x, y) {
    var copy_h = new Terminal_symbol("head");
    copy_h.x = x;
    copy_h.y = y;
    var c_node = copy_h;
    // loop_startに対応するloop_endを取るためのstack
    var loop_nest = [];
    // 一つの関数の引数を取るための関数のstack
    var func = [];
    // arg_startに対応するarg_endを取るためのstack
    var arg = [];
    head = head.next;
    while (head != null) {
      if (head.type == "arg_start") {
        y -= 5;
      }
      c_node.append(head.copy_block(stage, x, y));
      c_node = c_node.next;
      if (c_node.type == "loop_start") {
        loop_nest.push(c_node);
      } else if (c_node.type == "loop_end") {
        var start = loop_nest.pop();
        start.loop.height = y - start.loop.y;
      } else if (c_node.type == "func_id") {
        func.push(c_node.arg_type.length);
      } else if (c_node.type == "arg_start") {
        arg.push(c_node.arg);
      } else if (c_node.type == "arg_end") {
        var start_arg = arg.pop();
        c_node.set_backgroundColor(start_arg.id);
        start_arg.height = y - start_arg.y;
        var length = func.pop();
        length--;
        if (length != 0) {
          func.push(length);
        }
      }
      head = head.next;
      if (head != null) {
        y += c_node.height + 5;
      }
    }
    return copy_h;
  },

  is_x_main_head_inside: function(x) {
    return this.x_head_inside(this.main_head, x);
  },

  is_y_main_head_inside: function(n, y) {
    return this.node_append(this.main_head, n, y);
  },

  is_x_s_head_inside: function(x) {
    return this.x_head_inside(this.s_head, x);
  },

  is_y_s_head_inside: function(n, y) {
    return this.node_append(this.s_head, n, y);
  },

  is_x_h_head_inside: function(x) {
    return this.x_head_inside(this.h_head, x);
  },

  is_y_h_head_inside: function(n, y) {
    return this.node_append(this.h_head, n, y);
  },

  is_x_d_head_inside: function(x) {
    return this.x_head_inside(this.d_head, x);
  },

  is_y_d_head_inside: function(n, y) {
    return this.node_append(this.d_head, n, y);
  },

  is_x_c_head_inside: function(x) {
    return this.x_head_inside(this.c_head, x);
  },

  is_y_c_head_inside: function(n, y) {
    return this.node_append(this.c_head, n, y);
  },

  x_head_inside: function(head, x) {
    if (x >= head.x - 5 && x <= head.x + head.width + 5)
      return true;
    return false;
  },

  node_append: function(node, append_node, y) {
    var keep = node;
    // console.log(append_node);
    while (node != null) {
      if (y <= node.y + node.height + 5 && y >= node.y + node.height) {
        node.append(append_node);
        node.move(append_node);
        return true;
      }
      keep = node;
      node = node.next;
    }
    if (y >= keep.y + keep.height && y <= 300) {
      keep.append(append_node);
      keep.move(append_node);
      return true;
    }
    return false;
  },

  debug: function(node) {
    while (node != null) {
      console.log(node.type);
      node = node.next;
    }
  },

});