var PIXI = require('pixi.js');
var check_collision = require('./misc').check_collision

var defaultSpeed = 5;
var startingPos = {
  x: 200,
  y: 300
}

var ball = {
  speed: {
    x: defaultSpeed,
    y: defaultSpeed
  }
};

ball.init = function init(renderer, texture) {
  ball.texture = texture;
  ball.sprite = new PIXI.Sprite(ball.texture);
  ball.startPos();
}

ball.startPos = function startPos() {
  ball.sprite.position.x = startingPos.x;
  ball.sprite.position.y = startingPos.y;
  ball.speed.x = defaultSpeed;
  ball.speed.y = defaultSpeed;
}

ball.paddle_collision = function paddle_collision(element) {
  if (check_collision(ball.sprite, element)) {
    ball.speed.y = -defaultSpeed;
  }
}

ball.bricks_collision = function bricks_collision(bricks, stage) {
  for (var b = 0; b < bricks.bricks.length; b++) {
    if (check_collision(ball.sprite, bricks.bricks[b])) {
      ball.speed.y = -ball.speed.y;
      bricks.destroy(bricks.bricks[b], stage);
    }
  }
}

ball.update = function update(renderer, reset) {
  ball.sprite.position.x += ball.speed.x;
  ball.sprite.position.y += ball.speed.y;

  if (ball.sprite.position.x + ball.sprite.width > renderer.width ||
      ball.sprite.position.x < 0) {
    ball.speed.x = -ball.speed.x;
  }
  else if (ball.sprite.position.y < 0) {
    ball.speed.y = -ball.speed.y;
  }
  else if (ball.sprite.position.y + ball.sprite.height > renderer.height) {
    reset();
  }
}

module.exports = ball;
