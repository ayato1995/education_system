var Play = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, stage) {
    enchant.Sprite.call(this, 32, 32);
    this.image = game.assets[PLAY];
    this.type = "play";
    this.x = x;
    this.y = y;
    this.register_play(stage);
  },

  play: function(stage) {
    var prog = stage.prog;
    var fm = new Func_map();
    var main = main_parser(prog.main_head);
    var main_head = prog.copy_blocks(stage, prog.main_head, stage.map.x + stage.map.width + 20, 10, "gray");
    fm.set_spead(func_parser(prog.s_head, "spead"));
    fm.set_heart(func_parser(prog.h_head, "heart"));
    fm.set_dia(func_parser(prog.d_head, "dia"));
    fm.set_clover(func_parser(prog.c_head, "clover"));
    run(main, new State(stage.player), fm);
  },

  register_play: function(stage) {
    this.addEventListener("touchstart", function() {
      if (!stage.prog.is_append()) {
        return;
      }
      stage.play_flag = true;
      stage.remove();
      stage.prog.move_blocks(stage.map.x + stage.map.width + 20);
      game.height += stage.prog.get_total_height();
      console.log("=============== play ===============");
      this.play(stage);
    });
  },
})