var Stage = enchant.Class.create(enchant.Scene, {
  initialize: function() {
    enchant.Scene.call(this);
    this.prog = new Prog();
    this.blocks = this.set_blocks();
    // is_touch : ブロックを作れるタイミングを管理
    this.is_touch = true;
  },

  set_blocks: function() {
    var b = [];
    b.push(new Up());
    b[0].set_block(null, 10, 10, "red", this);
    b.push(new Rotate_right());
    b[1].set_block(null, 10, 47, "red", this);
    b.push(new Rotate_left());
    b[2].set_block(null, 10, 84, "red", this);
    b.push(new Loop());
    b[3].set_block(null, null, 10, 121, this);
    b.push(new Func_id("spead", 0));
    b[4].set_block(null, 10, 195, "green", this);
    b.push(new Func_id("heart", 0));
    b[5].set_block(null, 10, 232, "green", this);
    b.push(new Func_id("dia", 0));
    b[6].set_block(null, 10, 269, "green", this);
    b.push(new Func_id("clover", 0));
    b[7].set_block(null, 10, 306, "green", this);
    return b;
  },

  display_blocks: function() {
    for (var i = 0; i < this.blocks.length; i++) {
      if (i == 3) {
        this.blocks[i].loop_addChild(this);
        continue;
      }
      this.addChild(this.blocks[i]);
    }
  },

  display_heads: function() {
    this.addChild(this.prog.main_space);
    this.addChild(this.prog.s_space);
    this.addChild(this.prog.h_space);
    this.addChild(this.prog.d_space);
    this.addChild(this.prog.c_space);
    /*
    this.addChild(this.prog.main_head);
    this.addChild(this.prog.s_head);
    this.addChild(this.prog.h_head);
    this.addChild(this.prog.d_head);
    this.addChild(this.prog.c_head);
    */
  },

  display_map: function(map) {
    this.addChild(map);
  },
});