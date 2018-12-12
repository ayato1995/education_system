var Play = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, stage) {
    enchant.Sprite.call(this, 32, 32);
    this.type = "play";
    this.x = x;
    this.y = y;
    this.backgroundColor = "yellowgreen";
    this.register_play(stage);
  },

  display_main: function(stage, main) {
    var prog = stage.prog;
    // var space = prog.create_space(stage.map.x, 10, 42, 300, "gray")
    main.display_stmts(stage, 200, 42);
  },

  play: function(stage) {
    var prog = stage.prog;
    var fm = new Func_map();
    var main = main_parser(prog.main_head);
    // this.display_main(stage, main);
    var head = prog.copy_blocks(stage, prog.main_head, 200, 42);
    fm.set_spead(func_parser(prog.s_head, "spead"));
    fm.set_heart(func_parser(prog.h_head, "heart"));
    fm.set_dia(func_parser(prog.d_head, "dia"));
    fm.set_clover(func_parser(prog.c_head, "clover"));
    run(main, new State(null), fm);
  },

  register_play: function(stage) {
    this.addEventListener("touchstart", function() {
      stage.play_flag = true;
      stage.remove_blocks();
      stage.remove_play();
      stage.prog.move_blocks();
      game.height += stage.prog.get_total_height();
      console.log("=============== play ===============");
      this.play(stage);
    });
  },
})