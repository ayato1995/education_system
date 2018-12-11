var Play = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, stage) {
    enchant.Sprite.call(this, 32, 32);
    this.type = "play";
    this.x = x;
    this.y = y;
    this.backgroundColor = "yellowgreen";
    this.register_play(stage);
  },

  play: function(prog) {
    var fm = new Func_map();
    var main = main_parser(prog.main_head);
    fm.set_spead(func_parser(prog.s_head, "spead"));
    fm.set_heart(func_parser(prog.h_head, "heart"));
    fm.set_dia(func_parser(prog.d_head, "dia"));
    fm.set_clover(func_parser(prog.c_head, "clover"));
    run(main, new State(null), fm);
  },

  register_play: function(stage) {
    this.addEventListener("touchstart", function() {
      stage.remove_blocks();
      stage.remove_play();
      stage.prog.move_blocks();
      game.height += stage.prog.get_total_height();
      console.log("=============== play ===============");
      this.play(stage.prog);
    });
  },
})