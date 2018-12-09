enchant();
const WIDTH = 600;
const HIGHT = 500;

window.onload = function() {
  var game = new Core(WIDTH, HIGHT);
  game.fps = 60;

  game.onload = function() {
    var stage = new Stage();
    game.pushScene(stage);
    stage.display_heads();
    stage.display_blocks();
    stage.display_play();
  }

  game.start();
  // core.debug();
}