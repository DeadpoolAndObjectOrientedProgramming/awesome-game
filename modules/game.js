var PIXI = require('pixi.js');

var renderer = new PIXI.autoDetectRenderer(400, 600);
var stage = new PIXI.Container();
var ready = false;

// Game objects
var paddle = require('./paddle');
var ball = require('./ball');
var bricks = require('./bricks');
var background = {};

var game = {}

game.animate = function animate() {
  requestAnimationFrame(animate);
  if (!ready) {
    return;
  }

  paddle.update(renderer);

  ball.paddle_collision(paddle.sprite);
  ball.update(renderer, game.reset);
  ball.bricks_collision(bricks, stage);

  renderer.render(stage);
}

game.init = function init(doc) {
  document.body.appendChild(renderer.view);
  PIXI.loader
    .add('background', 'images/background.jpg')
    .add('paddle', 'images/paddle.png')
    .add('ball', 'images/ball.png')
    .add('brick', 'images/brick.png')
    .on('progress', function (loader) {
      // Optional loading?
      // console.log(loader.progress);
    })
    .load(function (loader, resources) {
      background.texture = resources['background'].texture;
      background.sprite = new PIXI.Sprite(background.texture);
      background.sprite.position.x = 0;
      background.sprite.position.y = 0;

      paddle.init(renderer, resources['paddle'].texture, doc);
      ball.init(renderer, resources['ball'].texture);
      bricks.init(renderer, resources['brick'].texture);

      stage.addChild(background.sprite);
      stage.addChild(paddle.sprite);
      stage.addChild(ball.sprite);
      bricks.addBricksToStage(stage);

      ready = true;
    });
}

game.reset = function reset() {
  ball.startPos();
  paddle.startPos();
  bricks.reset(stage);
  bricks.addBricksToStage(stage);
}

module.exports = game;
