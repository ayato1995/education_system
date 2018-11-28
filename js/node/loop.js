var Loop = enchant.Class.create(enchant.Sprite, {
  initialize: function() {
    enchant.Sprite.call(this, 32, 32 * 2 + 5);
    this.x;
    this.y;
    this.default_x;
    this.default_y;
    this.start = new Loop_start();
    // this.start.set_block(start_img, 10, 121, "blue");
    this.end = new Loop_end();
    // this.end.set_block(end_img, 10, 158, "blue");
    this.height = this.start.height + this.end.height + 5;
    this.backgroundColor = "orange";
  },

  set_block: function(start_img, end_img, x, y, prog) {
    this.default_x = x;
    this.default_y = y;
    this.x = x;
    this.y = y;
    this.start.set_block(null, this.x, this.default_y, "blue", prog, this, this.end);
    this.end.set_block(null, this.x, this.default_y + this.start.height + 5, "blue", prog, this, this.start);
    // this.register_move();
  },

  loop_addChild: function(stage) {
    stage.addChild(this);
    stage.addChild(this.start);
    stage.addChild(this.end);
  },

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
});