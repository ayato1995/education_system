var Goal = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y) {
    enchant.Sprite.call(this, 16, 16);
    this.image = game.assets[GOAL];
    console.log(x + " " + y);
    this.y = y;
  },
})