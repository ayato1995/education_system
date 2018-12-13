var Player = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, direction) {
    enchant.Sprite.call(this, 32, 32);
    this.image = game.assets[PLAYER];
    this.frame = this.set_frame(direction);
    this.x = x;
    this.y = y;
  },

  set_frame: function(dire) {
    var d = 0;
    if (dire == "up")
      d = 28;
    else if (dire == "left")
      d = 10;
    else if (dire == "right")
      d = 19;
    else if (dire == "down")
      d = 1;
    if (d == 0)
      console.log("player set_frame error : " + dire);
    return d;
  },

  // advance: funciton(stage)
});