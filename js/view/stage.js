var Stage = enchant.Class.create(enchant.Scene, {
  initialize: function() {
    enchant.Scene.call(this);
  },

  set_blocks: function() {
    var b = [];
    b.push(new Up());
    b[0].set_block(null, 10, 10, "red");
    b.push(new Rotate_right());
    b[1].set_block(null, 10, 47, "red");
    b.push(new Rotate_left());
    b[2].set_block(null, 10, 84, "red");
    b.push(new Loop_start());
    b[3].set_block(null, 10, 121, "blue");
    b.push(new Loop_end());
    b[4].set_block(null, 10, 158, "blue");
    b.push(new Func_id("spead", 0));
    b[5].set_block(null, 10, 195, "green");
    b.push(new Func_id("heart", 0));
    b[6].set_block(null, 10, 232, "green");
    b.push(new Func_id("dia", 0));
    b[7].set_block(null, 10, 269, "green");
    b.push(new Func_id("clover", 0));
    b[8].set_block(null, 10, 306, "green");
    return b;
  },

  display_blocks: function() {
    var blocks = this.set_blocks();
    for (var i = 0; i < blocks.length; i++) {
      this.addChild(blocks[i]);
    }
  },

  display_map: function(map) {
    this.addChild(map);
  },
});