'use strict';
var PIXI = require('pixi.js');

var paddle = {
  right: false,
  left: false,
  speed: 8,
  margin: 5
};
var rendererWidth;
var rendererHeight;

paddle.init = function init(renderer, texture, doc) {
  paddle.texture = texture;
  paddle.sprite = new PIXI.Sprite(paddle.texture);
  rendererWidth = renderer.width;
  rendererHeight = renderer.height;

  paddle.startPos();

  // Add event listeners to move the paddle
  doc.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyIdentifier === 'Left') {
      paddle.left = false;
    }
    else if (event.keyIdentifier === 'Right') {
      paddle.right = false;
    }
  }, false);

  doc.addEventListener('keydown', function(event) {
    event.preventDefault();
    if (event.keyIdentifier === 'Left') {
      paddle.left = true;
    }
    else if (event.keyIdentifier === 'Right') {
      paddle.right = true;
    }
  }, false);
};

paddle.startPos = function startPos() {
  paddle.sprite.position.x = (rendererWidth - paddle.sprite.width)/2;
  paddle.sprite.position.y = rendererHeight - paddle.sprite.height;
};

paddle.update = function update(renderer) {
  if (paddle.right && !paddle.left && 
      paddle.sprite.position.x + paddle.sprite.width <= renderer.width - paddle.margin) {
    paddle.sprite.position.x += paddle.speed;
  }
  else if (paddle.left && !paddle.right &&
           paddle.sprite.position.x >= paddle.margin && !paddle.right) {
    paddle.sprite.position.x -= paddle.speed;
  }
};


module.exports = paddle;
