var Loop = enchant.Class.create(enchant.Sprite, {
  initialize: function() {
    enchant.Sprite.call(this, 32, 32 * 2 + 5);
    this.x;
    this.y;
    this.start = new Loop_start();
    this.end = new Loop_end();
    this.height = this.start.height + this.end.height + 5;
    this.backgroundColor = "orange";
  },

  create_block: function(stage, x, y, loop) {
    var l = new Loop();
    l.x = x;
    l.y = y;
    l.start.create_block(loop, stage);
    l.end.create_block(loop, stage);
    return l;
  },

  set_block: function(start_img, end_img, x, y, stage) {
    this.x = x;
    this.y = y;
    this.start.set_block(start_img, this.x, this.y, "blue", stage, this, this.end);
    this.end.set_block(start_img, this.x, this.y + this.start.height + 5, "blue", stage, this, this.start);
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