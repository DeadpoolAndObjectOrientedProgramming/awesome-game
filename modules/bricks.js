var PIXI = require('pixi.js');

var bricks = {
  bricks: []
};
var rows = 5;
var colors = [
  "0xFF0000",
  "0x00FF00",
  "0x7777FF",
  "0xFF00FF",
  "0x00FFFF"
];

var numInRow;
var totalWidth;
var startPosX;

bricks.init = function init(renderer, texture) {
  bricks.texture = texture;
  numInRow = Math.floor(renderer.width/bricks.texture.width) - 1;
  totalWidth = bricks.texture.width * numInRow;
  startPosX = (renderer.width - totalWidth)/2;
  bricks.reset();
}

bricks.addBricksToStage = function addBricksToStage(stage) {
  for (var i = 0; i < bricks.bricks.length; i++) {
    stage.addChild(bricks.bricks[i]);
  }
}

bricks.destroy = function destroy(brick, stage) {
  var index = bricks.bricks.indexOf(brick);
  if (index > -1) {
    bricks.bricks.splice(index, 1);
  }
  stage.removeChild(brick);
}

bricks.reset = function reset(stage) {
  for (var b = 0; b < bricks.bricks.length; b++) {
    stage.removeChild(bricks.bricks[b]);
  }

  bricks.bricks = [];
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < numInRow; col++) {
      var b = new PIXI.Sprite(bricks.texture);
      b.tint = colors[row % colors.length];
      b.position.x = startPosX + col * bricks.texture.width;
      b.position.y = (2 + row) * bricks.texture.height;
      bricks.bricks.push(b);
    }
  }
}

module.exports = bricks;
