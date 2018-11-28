var Terminal_symbol = enchant.Class.create(enchant.Sprite, {
  initialize: function(type) {
    enchant.Sprite.call(this, 32, 32);
    this.type = type;
    /* 画面出力用のデータ */
    this.image;
    this.x;
    this.y;
    this.backgroundColor;
    /* 複製したnodeを管理する */
    this.node;
    /* 連結リスト */
    this.prev = null;
    this.next = null;
  },

  /* 画面出力用のデータのsetter */
  set_block: function(img, x, y, color, stage) {
    this.set_image(img);
    this.set_x(x);
    this.set_y(y);
    this.set_backgroundColor(color);
    this.register_init_move(stage);
    this.register_init_block_append(stage);
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
      node.y = prev.y + prev.height + 5;
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
    console.log(this);
    console.log(this.prev);
    if (this.next != null) {
      console.log("tttttttt");
      this.next.set_prev(this.prev);
    }
    console.log(this.prev);
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
  /* ブロックを作成し作成したブロックを移動させるイベント */
  register_init_move: function(stage) {
    this.addEventListener("touchmove", function(e) {
      var node = this.node;
      if (stage.is_touch) {
        node = this.create_block(stage);
        stage.addChild(node);
        this.node = node;
        stage.is_touch = false;
      }
      if (node.prev != null || node.next != null) {
        if (node.x > node.prev.x + 32 || node.x < node.prev.x) {
          node.delete();
        }
      }
      node.x = e.x;
      node.y = e.y;
    });
  },

  /* 作成したブロックを追加するためのイベント */
  register_init_block_append: function(stage) {
    this.addEventListener("touchend", function(e) {
      console.log(this.node.type);
      stage.is_touch = true;
      var prog = stage.prog
      if (prog.is_x_main_head_inside(e.x)) {
        if (prog.is_y_main_head_inside(this.node, e.y)) {
          return true;
        }
      }
      if (prog.is_x_s_head_inside(e.x)) {
        if (prog.is_y_s_head_inside(this.node, e.y)) {
          return true;
        }
      }
      if (prog.is_x_h_head_inside(e.x)) {
        if (prog.is_y_h_head_inside(this.node, e.y)) {
          return true;
        }
      }
      if (prog.is_x_d_head_inside(e.x)) {
        if (prog.is_y_d_head_inside(this.node, e.y)) {
          return true;
        }
      }
      if (prog.is_x_c_head_inside(e.x)) {
        if (prog.is_y_c_head_inside(this.node, e.y)) {
          return true;
        }
      }
      stage.removeChild(this.node);
    });
  },

  register_move: function(stage) {
    this.addEventListener("touchmove", function(e) {
      if (this.prev != null || this.next != null) {
        this.delete();
      }
      this.x = e.x;
      this.y = e.y;
    })
  },


  /* 連結リスト挿入用 */
  register_append: function(stage) {
    this.addEventListener("touchend", function(e) {
      console.log(this.type);
      var prog = stage.prog
      if (prog.is_x_main_head_inside(e.x)) {
        if (prog.is_y_main_head_inside(this, e.y)) {
          return true;
        }
      }
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
      stage.removeChild(this);
    });
  },
});