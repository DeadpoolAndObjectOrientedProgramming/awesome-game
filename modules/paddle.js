var PIXI = require('pixi.js');

var paddle = {
  right: false,
  left: false,
  speed: 8,
  margin: 5
};

paddle.init = function init(renderer, texture, doc) {
  paddle.texture = texture;
  paddle.sprite = new PIXI.Sprite(paddle.texture);
  paddle.sprite.position.x = (renderer.width - paddle.sprite.width)/2;
  paddle.sprite.position.y = renderer.height - paddle.sprite.height;

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
}

paddle.animate = function animate(renderer) {
  if (paddle.right && !paddle.left && 
      paddle.sprite.position.x + paddle.sprite.width <= renderer.width - paddle.margin) {
    paddle.sprite.position.x += paddle.speed;
  }
  else if (paddle.left & !paddle.right &&
           paddle.sprite.position.x >= paddle.margin && !paddle.right) {
    paddle.sprite.position.x -= paddle.speed;
  }
}


module.exports = paddle;
