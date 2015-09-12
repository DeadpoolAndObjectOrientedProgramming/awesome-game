var PIXI = require('pixi.js');

var direction = null;
var speed = 5

// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
var renderer = new PIXI.WebGLRenderer(400, 600);

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var paddleTexture = PIXI.Texture.fromImage('paddle.png');
var paddle = new PIXI.Sprite(paddleTexture);

paddle.position.x = 0;
paddle.position.y = 600 - 24;

stage.addChild(paddle);

animate();

window.addEventListener('keyup', function(event) {
  event.preventDefault();
  direction = null;
}, false);

document.addEventListener('keydown', function(event) {
  event.preventDefault();
  if (event.keyIdentifier === 'Left') {
    direction = 'LEFT';
  } else if (event.keyIdentifier === 'Right') {
    direction = 'RIGHT';
  }
}, false);

function animate() {
  // start the timer for the next animation loop
  requestAnimationFrame(animate);

  if (direction === 'RIGHT' && paddle.position.x + 112 > 400) {
    direction = 'LEFT';
  } else if (direction === 'LEFT' && paddle.position.x < 0) {
    direction = 'RIGHT';
  }

  if (direction === 'RIGHT') {
    paddle.position.x += speed;
  } else if (direction === 'LEFT') {
    paddle.position.x -= speed;
  }

  // this is the main render call that makes pixi draw your container and its children.
  renderer.render(stage);
}
