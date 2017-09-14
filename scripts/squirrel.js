Squirrel = function(game, x, y) {
  Phaser.Sprite.call(this,game, x, y, 'squirrel');
  this.scale.set(2,2);
  this.anchor.set(0.5, 0.5);
  this.smoothed = false;

  this.animations.add('idle', [0,1,2,3,4,5,6,7], 10, true);
  this.animations.add('run', [32,33,34], 10, true);
  this.animations.play('run');
};

Squirrel.prototype = Object.create(Phaser.Sprite.prototype);
Squirrel.prototype.constructor = Squirrel;

Squirrel.preload = function(){
  game.load.spritesheet('squirrel', 'assets/Monster-squirrel.png', 32, 32, -1);
};

Squirrel.createAtRandom = function(game) {
  var rnd = game.rnd;
  var x = rnd.between(0,game.world.width);
  var y = rnd.between(0, game.world.height);
  var squirrel = new Squirrel(game, x, y);
  game.add.existing(squirrel);
  return squirrel;
};
