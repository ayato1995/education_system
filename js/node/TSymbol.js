var Terminal_symbol = enchant.Class.create(enchant.Sprite, {
  initialize: function(type) {
    enchant.Sprite.call(this, 32, 32);
    this.type = type;
    /* 画面出力用のデータ */
    this.image;
    this.x;
    this.default_x;
    this.y;
    this.default_y;
    this.backgroundColor;
    /* 連結リスト */
    this.prev = null;
    this.next = null;
  },

  /* 画面出力用のデータのsetter */
  set_block: function(img, x, y, color, prog) {
    this.set_image(img);
    this.set_x(x);
    this.set_default_x(x);
    this.set_y(y);
    this.set_default_y(y);
    this.set_backgroundColor(color);
    this.register_move();
    this.register_append(prog);
  },

  set_image: function(img) {
    this.image = img;
  },

  set_x: function(x) {
    this.x = x;
  },

  set_y: function(y) {
    this.y = y;
  },

  set_default_x: function(x) {
    this.default_x = x;
  },

  set_default_y: function(y) {
    this.default_y = y;
  },

  set_backgroundColor: function(color) {
    this.backgroundColor = color;
  },

  move: function(node) {
    if (node.type == "head") {
      node = node.next;
    }
    while (node != null) {
      var prev = node.prev;
      node.x = prev.x;
      node.y = prev.y + 32 + 5;
      node = node.next;
    }
  },

  /* 連結リスト */
  set_next: function(node) {
    this.next = node;
  },

  set_prev: function(node) {
    this.prev = node;
  },

  append: function(node) {
    if (this.next != null) {
      var n = this.next;
      node.set_next(n);
      n.set_prev(node);
    }
    this.set_next(node);
    this.next.set_prev(this);
    this.move(node);
  },

  delete: function() {
    if (this.next != null) {
      this.next.set_prev(this.prev);
    }
    this.prev.set_next(this.next);
    var prev = this.prev;
    this.next = null;
    this.prev = null;
    this.move(prev);
  },

  /* コンソール出力用 */
  display: function() {
    console.log(this.type);
  },

  /* イベントリスナ登録 */
  register_move: function() {
    this.addEventListener("touchmove", function(e) {
      if (this.prev != null || this.next != null) {
        if (this.x > this.prev.x + 32 || this.x < this.prev.x) {
          this.delete();
        }
      }
      this.x = e.x;
      this.y = e.y;
    });
  },

  /* 連結リスト挿入用 */
  register_append: function(prog) {
    this.addEventListener("touchend", function(e) {
      if (prog.is_x_main_head_inside(e.x)) {
        if (prog.is_y_main_head_inside(this, e.y))
          return true;
      }
      if (prog.is_x_s_head_inside(e.x)) {
        if (prog.is_y_s_head_inside(this, e.y))
          return true;
      }
      if (prog.is_x_h_head_inside(e.x)) {
        if (prog.is_y_h_head_inside(this, e.y))
          return true;
      }
      if (prog.is_x_d_head_inside(e.x)) {
        if (prog.is_y_d_head_inside(this, e.y))
          return true;
      }
      if (prog.is_x_c_head_inside(e.x)) {
        if (prog.is_y_c_head_inside(this, e.y))
          return true;
      }
      this.x = this.default_x;
      this.y = this.default_y;
    });
  },

  /* 連結リスト削除用 */
  register_remove: function(prog) {
    this.addEventListener("touchend", function(e) {
    });
  }
});