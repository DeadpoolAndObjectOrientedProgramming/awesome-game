'use strict';
function checkCollision(a, b) {

  return a.position.y + a.height > b.position.y &&
         a.position.y < b.position.y + b.height &&
         a.position.x + a.width > b.position.x &&
         a.position.x < b.position.x + b.width;
}

module.exports.checkCollision = checkCollision;
