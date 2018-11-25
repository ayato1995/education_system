enchant();
const WIDTH = 600;
const HIGHT = 400;

window.onload = function() {
  var game = new Core(WIDTH, HIGHT);
  game.fps = 60;

  game.onload = function() {
    var stage = new Stage();
    game.pushScene(stage);
    stage.display_blocks();
    /*
    var fm = new Func_map();
    var main = main_parser(main_prog);
    var heart = func_parser(new heart_prog());
    var clover = func_parser(new clover_prog());
    fm.set_heart(heart);
    fm.set_clover(clover);
    */
    /*
    fm.set_spead(func_parser(new spead_prog()));
    fm.set_dia(func_parser(new dia_prog()));
    */
    /*
    console.log("========= parser ========");
    if (main != null){
      console.log("main");
      main.print_stmts();
    }
    console.log("=========================");
    if (heart != null) {
      console.log(heart.name);
      heart.print_stmts();
    }
    console.log("=========================");
    if (clover != null) {
      console.log(clover.name);
      clover.print_stmts();
    }
    */
    /*
    if (dia != null) {
      console.log(dia.name);
      dia.print_stmts();
    }
    */
    /*
    var state = new State(null);
    console.log("======= interpriter =======");
    run(main, state, fm);
    */
  }

  game.start();
  // core.debug();
}