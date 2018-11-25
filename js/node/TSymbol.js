var Terminal_symbol = enchant.Class.create(enchant.Sprite, {
  initialize: function(type) {
    enchant.Sprite.call(this, 32, 32);
    this.type = type;
    /* 画面出力用のデータ */
    this.image;
    this.x;
    this.y;
    this.backgroundColor;
    /* 連結リスト */
    this.next = null;
  },

  /* 画面出力用のデータのsetter */
  set_block: function(img, x, y, color) {
    this.set_image(img);
    this.set_x(x);
    this.set_y(y);
    this.set_backgroundColor(color);
    this.register_move();
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

  /* 連結リスト */
  set_next: function(node) {
    this.next = node;
  },

  /* コンソール出力用 */
  display: function() {
    console.log(this.type);
  },

  /* イベントリスナ登録 */
  register_move: function() {
    this.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });
  }
});