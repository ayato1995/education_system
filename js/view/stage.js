var Stage = enchant.Class.create(enchant.Scene, {
  initialize: function(id) {
    enchant.Scene.call(this);
    this.map = this.set_map(id);
    this.player = new Player(this.map.init_x, this.map.init_y, this.map.init_direction);
    this.blocks = this.set_blocks();
    this.play = new Play(this.blocks[this.blocks.length - 1].x, this.set_y(this.blocks[this.blocks.length - 1]), this);
    this.prog = new Prog(this.blocks[0].x + this.blocks[0].height + 20);
    // is_touch : ブロックを作れるタイミングを管理
    this.is_touch = true;
    // play_flag : プログラムを実行しているか管理
    this.play_flag = false;
  },

  set_map: function(id) {
    if (id == 0) {
      return add_map_1();
    }
    return null;
  },

  set_blocks: function() {
    var b = [];
    var map_x = this.map.x + this.map.width + 10;
    b.push(new Up());
    b[0].set_block(null, map_x, 10, "red", this);
    b.push(new Rotate_right());
    b[1].set_block(null, map_x, this.set_y(b[0]), "red", this);
    b.push(new Rotate_left());
    b[2].set_block(null, map_x, this.set_y(b[1]), "red", this);
    b.push(new Loop());
    b[3].set_block(null, null, map_x, this.set_y(b[2]), this);
    b.push(new Func_id("spead"));
    b[4].set_block(null, map_x, this.set_y(b[3]), "green", this);
    b.push(new Func_id("heart"));
    b[5].set_block(null, map_x, this.set_y(b[4]), "green", this);
    b.push(new Func_id("dia"));
    b[6].set_block(null, map_x, this.set_y(b[5]), "green", this);
    b.push(new Func_id("clover"));
    b[7].set_block(null, map_x, this.set_y(b[6]), "green", this);
    b.push(new Param(0));
    b[8].set_block(null, map_x, this.set_y(b[7]), "aquamarine", this);
    b.push(new Param(1));
    b[9].set_block(null, map_x, this.set_y(b[8]), "gold", this);
    b.push(new Param(2));
    b[10].set_block(null, map_x, this.set_y(b[9]), "pink", this);
    return b;
  },

  set_y: function(b) {
    return b.y + b.height + 5;
  },

  display: function() {
    this.display_heads();
    this.display_blocks();
    this.display_play();
    this.display_map();
    this.display_player();
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

  remove_blocks: function() {
    for (var i = 0; i < this.blocks.length; i++) {
      if (i == 3) {
        this.blocks[i].remove_block(this);
        continue;
      }
      this.removeChild(this.blocks[i]);
    }
  },

  display_play: function() {
    this.addChild(this.play);
  },

  remove_play: function() {
    this.removeChild(this.play);
  },

  display_heads: function() {
    this.addChild(this.prog.main_space);
    this.addChild(this.prog.s_space);
    this.addChild(this.prog.s_head);
    this.addChild(this.prog.h_space);
    this.addChild(this.prog.h_head);
    this.addChild(this.prog.d_space);
    this.addChild(this.prog.d_head);
    this.addChild(this.prog.c_space);
    this.addChild(this.prog.c_head);
  },

  display_map: function() {
    this.addChild(this.map);
  },

  display_player: function() {
    this.addChild(this.player);
  },
});