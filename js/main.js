enchant();
const WIDTH = 600;
const HIGHT = 320;

window.onload = function() {
  var game = new Core(WIDTH, HIGHT);
  game.fps = 60;

  game.onload = function() {
    var main = main_parser(main_prog);
    if (main != null)
      main.print_stmts();
  }

  game.start();
  // core.debug();
}