enchant();
const WIDTH = 600;
const HIGHT = 320;

window.onload = function() {
  var game = new Core(WIDTH, HIGHT);
  game.fps = 60;

  game.onload = function() {
    var main = main_parser(main_prog);
    var heart = func_parser(new heart_prog());
    var dia = func_parser(new dia_prog());
    if (main != null){
      console.log("main");
      main.print_stmts();
    }
    if (heart != null) {
      console.log(heart.name);
      heart.print_stmts();
    }
    if (dia != null) {
      console.log(dia.name);
      dia.print_stmts();
    }
  }

  game.start();
  // core.debug();
}