function check_collision(a, b) {
  return a.position.y + a.height > b.position.y &&
         a.position.x + a.width > b.position.x &&
         a.position.x < b.position.x + b.width;
}

module.exports.check_collision = check_collision;
