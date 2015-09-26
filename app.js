var PIXI = require('pixi.js');
var ready = false;

// Paddle variables
var paddle = {
  right: false,
  left: false,
  speed: 8,
  margin: 5
};
var background = {};
var ball = {
  speed: {
    x: 5,
    y: 5
  }
};

// Pixi stage
var renderer = new PIXI.autoDetectRenderer(400, 600);
var stage = new PIXI.Container();

document.body.appendChild(renderer.view);

PIXI.loader
  .add('background', 'images/background.jpg')
  .add('paddle', 'images/paddle.png')
  .add('ball', 'images/ball.png')
  .on('progress', function (loader) {
    // Optional loading?
    // console.log(loader.progress);
  })
  .load(function (loader, resources) {
    background.texture = resources['background'].texture;
    background.sprite = new PIXI.Sprite(background.texture);
    background.sprite.position.x = 0;
    background.sprite.position.y = 0;

    paddle.texture = resources['paddle'].texture;
    paddle.sprite = new PIXI.Sprite(paddle.texture);
    paddle.sprite.position.x = (renderer.width - paddle.sprite.width)/2;
    paddle.sprite.position.y = renderer.height - paddle.sprite.height; 

    ball.texture = resources['ball'].texture;
    ball.sprite = new PIXI.Sprite(ball.texture);
    ball.sprite.position.x = 200;
    ball.sprite.position.y = 300;

    stage.addChild(background.sprite);
    stage.addChild(paddle.sprite);
    stage.addChild(ball.sprite);

    ready = true;
  });

animate();

window.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyIdentifier === 'Left') {
    paddle.left = false;
  }
  else if (event.keyIdentifier === 'Right') {
    paddle.right = false;
  }
}, false);

document.addEventListener('keydown', function(event) {
  event.preventDefault();
  if (event.keyIdentifier === 'Left') {
    paddle.left = true;
  } 
  else if (event.keyIdentifier === 'Right') {
    paddle.right = true;
  }
}, false);

function animate_paddle() {
  // Only move the paddle if only one of the directions is pressed
  if (paddle.right && !paddle.left &&
      paddle.sprite.position.x + paddle.sprite.width <= renderer.width - paddle.margin) {
    paddle.sprite.position.x += paddle.speed;
  } 
  else if (paddle.left && !paddle.right &&
           paddle.sprite.position.x >= paddle.margin && !paddle.right) {
    paddle.sprite.position.x -= paddle.speed;
  }
}

function animate_ball() {
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
    ball.sprite.position.x = 200;
    ball.sprite.position.y = 300;
    ball.speed.x = 5;
    ball.speed.y = 5;
  }

  // Check for paddle collision
  if (check_collision(ball.sprite, paddle.sprite)) {
    ball.speed.y = -Math.abs(ball.speed.y)
  }
}

function check_collision(a, b) {
  return a.position.y + a.height > b.position.y &&
         a.position.x + a.width > b.position.x &&
         a.position.x < b.position.x + b.width;
}


function animate() {
  // start the timer for the next animation loop
  requestAnimationFrame(animate);
  if (!ready) {
    return;
  }

  // ********* Paddle *********
  animate_paddle();

  // ********* Ball *********
  animate_ball();

  // this is the main render call that makes pixi draw your container and its children.
  renderer.render(stage);
}
