var PIXI = require('pixi.js');

// Paddle variables
var dir_right = false;
var dir_left = false;
var speed = 8;

var renderer = new PIXI.autoDetectRenderer(400, 600);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var backgroundTexture = PIXI.Texture.fromImage('background.jpg');
var background = new PIXI.Sprite(backgroundTexture);

background.position.x = 0;
background.position.y = 0;

stage.addChild(background);

var paddleTexture = PIXI.Texture.fromImage('paddle.png');
var paddle = new PIXI.Sprite(paddleTexture);

paddle.position.x = 0;
paddle.position.y = 600 - 24;

stage.addChild(paddle);

var ballTexture = PIXI.Texture.fromImage('ball.png');
var ball = new PIXI.Sprite(ballTexture);

ball.position.x = 200;
ball.position.y = 300;

stage.addChild(ball);

animate();

window.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyIdentifier === 'Left') {
    dir_left = false;
  }
  else if (event.keyIdentifier === 'Right') {
    dir_right = false;
  }
}, false);

document.addEventListener('keydown', function(event) {
  event.preventDefault();
  if (event.keyIdentifier === 'Left') {
    dir_left = true;
  } 
  else if (event.keyIdentifier === 'Right') {
    dir_right = true;
  }
}, false);

function animate() {
  // start the timer for the next animation loop
  requestAnimationFrame(animate);

  if (dir_right && paddle.position.x + paddle.width <= background.width && !dir_left) {
    paddle.position.x += speed;
  } 
  else if (dir_left && paddle.position.x >= 0 && !dir_right) {
    paddle.position.x -= speed;
  }

  // this is the main render call that makes pixi draw your container and its children.
  renderer.render(stage);
}
