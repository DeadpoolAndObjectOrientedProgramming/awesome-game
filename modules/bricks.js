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

bricks.init = function init(renderer, texture) {
  bricks.texture = texture;
  var numInRow = Math.floor(renderer.width/bricks.texture.width) - 1;
  var totalWidth = bricks.texture.width * numInRow;
  var startPosX = (renderer.width - totalWidth)/2;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < numInRow; col++) {
      var b = new PIXI.Sprite(bricks.texture);
      b.tint = colors[row];
      b.position.x = startPosX + col * bricks.texture.width;
      b.position.y = (2 + row) * bricks.texture.height;
      bricks.bricks.push(b);
    }
  }
}

bricks.addBricksToStage = function addBricksToStage(stage) {
  for (var i = 0; i < bricks.bricks.length; i++) {
    stage.addChild(bricks.bricks[i]);
  }
}

module.exports = bricks;
