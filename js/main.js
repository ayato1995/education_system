enchant();
const WIDTH = 600;
const HIGHT = 320;

window.onload = function() {
  var game = new Core(WIDTH, HIGHT);
  game.fps = 60;

  game.onload = function() {
  }

  game.start();
  // core.debug();
}