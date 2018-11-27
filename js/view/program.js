var Prog = enchant.Class.create({
  initialize: function() {
    this.main_head = new Terminal_symbol("head");
    this.set_head(this.main_head, 200, 10);
    this.s_head = new Terminal_symbol("head");
    this.set_head(this.s_head, 240, 10);
    this.h_head = new Terminal_symbol("head");
    this.set_head(this.h_head, 280, 10);
    this.d_head = new Terminal_symbol("head");
    this.set_head(this.d_head, 320, 10);
    this.c_head = new Terminal_symbol("head");
    this.set_head(this.c_head, 360, 10);
  },

  set_head: function(head, x, y) {
    head.set_x(x);
    head.set_y(y);
    head.set_backgroundColor("yellow");
  },

  is_x_main_head_inside: function(x) {
    if (x >= this.main_head.x && x <= this.main_head.x + this.main_head.width)
      return true;
    return false;
  },

  is_y_main_head_inside: function(n, y) {
    return this.node_append(this.main_head, n, y);
  },

  is_x_s_head_inside: function(x) {
    if (x >= this.s_head.x && x <= this.s_head.x + this.s_head.width)
      return true;
    return false;
  },

  is_y_s_head_inside: function(n, y) {
    return this.node_append(this.s_head, n, y);
  },

  is_x_h_head_inside: function(x) {
    if (x >= this.h_head.x && x <= this.h_head.x + this.h_head.width)
      return true;
    return false;
  },

  is_y_h_head_inside: function(n, y) {
    return this.node_append(this.h_head, n, y);
  },

  is_x_d_head_inside: function(x) {
    if (x >= this.d_head.x && x <= this.d_head.x + this.d_head.width)
      return true;
    return false;
  },

  is_y_d_head_inside: function(n, y) {
    return this.node_append(this.d_head, n, y);
  },

  is_x_c_head_inside: function(x) {
    if (x >= this.c_head.x && x <= this.c_head.x + this.c_head.width)
      return true;
    return false;
  },

  is_y_c_head_inside: function(n, y) {
    return this.node_append(this.c_head, n, y);
  },

  node_append: function(node, append_node, y) {
    var keep = node;
    while (node != null) {
      if (y <= node.y + node.height + 5 && y >= node.y + node.height) {
        node.append(append_node);
        return true;
      }
      keep = node;
      node = node.next;
    }
    if (y >= keep.y + keep.height && y <= 300) {
      keep.append(append_node);
      return true;
    }
    return false;
  },

});