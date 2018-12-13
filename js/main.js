enchant();
const WIDTH = 700;
const HIGHT = 460;
const PLAYER = "../img/chara5.png";
const MAP = "../img/map0.gif";
const GOAL = "../img/goal.png";

window.onload = function() {
  game = new Core(WIDTH, HIGHT);
  game.fps = 60;
  //game.preload(PLAYER, MAP, GOAL);
  game.preload("../img/map0.gif")

  game.onload = function() {
    var stage = new Stage(0);
    game.pushScene(stage);
    stage.display();
  }

  game.start();
  // core.debug();
}