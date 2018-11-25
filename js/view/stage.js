var Stage = enchant.Class.create(enchant.Scene, {
  initialize: function() {
    enchant.Scene.call(this);
    this.prog = new Prog();
    this.blocks = this.set_blocks();
  },

  set_blocks: function() {
    var b = [];
    b.push(new Up());
    b[0].set_block(null, 10, 10, "red", this.prog);
    b.push(new Rotate_right());
    b[1].set_block(null, 10, 47, "red", this.prog);
    b.push(new Rotate_left());
    b[2].set_block(null, 10, 84, "red", this.prog);
    /*
    var loop = new Group();
    var start = new Loop_start();
    start.set_block(null, 10, 121, "blue");
    var end = new Loop_end();
    end.set_block(null, 10, 158, "blue");
    loop.addChild(start);
    loop.addChild(end);
    b.push(loop);
    */
    b.push(new Loop_start());
    b[3].set_block(null, 10, 121, "blue", this.prog);
    b.push(new Loop_end());
    b[4].set_block(null, 10, 158, "blue", this.prog);
    b.push(new Func_id("spead", 0));
    b[5].set_block(null, 10, 195, "green", this.prog);
    b.push(new Func_id("heart", 0));
    b[6].set_block(null, 10, 232, "green", this.prog);
    b.push(new Func_id("dia", 0));
    b[7].set_block(null, 10, 269, "green", this.prog);
    b.push(new Func_id("clover", 0));
    b[8].set_block(null, 10, 306, "green", this.prog);
    return b;
  },

  display_blocks: function() {
    // var blocks = this.set_blocks();
    for (var i = 0; i < this.blocks.length; i++) {
      this.addChild(this.blocks[i]);
    }
  },

  display_heads: function() {
    this.addChild(this.prog.main_head);
    this.addChild(this.prog.s_head);
    this.addChild(this.prog.h_head);
    this.addChild(this.prog.d_head);
    this.addChild(this.prog.c_head);
  },

  display_map: function(map) {
    this.addChild(map);
  },
});