var PIXI = require('pixi.js');
var did_collide = require('./misc').check_collision;

var default_speed = 5;
var starting_pos = {
  x: 200,
  y: 300
}

var ball = {
  speed: {
    x: default_speed,
    y: default_speed
  }
};

ball.init = function init(renderer, texture) {
  ball.texture = texture;
  ball.sprite = new PIXI.Sprite(ball.texture);
  ball.sprite.position.x = starting_pos.x;
  ball.sprite.position.y = starting_pos.y;
}

ball.check_collision = function check_collision(element) {
  if (did_collide(ball.sprite, element)) {
    ball.speed.y = -default_speed;
  }
}

ball.animate = function animate(renderer) {
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
    ball.sprite.position.x = starting_pos.x;
    ball.sprite.position.y = starting_pos.y;
    ball.speed.x = default_speed;
    ball.speed.y = default_speed;
  }
}

module.exports = ball;
