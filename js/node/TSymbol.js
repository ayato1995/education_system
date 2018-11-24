var Terminal_symbol = enchant.Class.create(enchant.Sprite, {
  initialize: function(type) {
    enchant.Sprite.call(this, 16, 16);
    this.type = type;
    /* 画面出力用のデータ */
    this.image;
    this.x;
    this.y;
    this.backgroundColor;

  },

  /* 画面出力用のデータのsetter */
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

  /* コンソール出力用 */
  display: function() {
    console.log(this.type);
  },
});