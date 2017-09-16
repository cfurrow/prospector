Miner = function(game, x, y) {
  Phaser.Sprite.call(this,game, x, y, 'miner');
  this.scale.set(3,3);
  this.anchor.set(0.5, 0.8);
  this.smoothed = false;

  game.add.existing(this);
};

Miner.prototype = Object.create(Phaser.Sprite.prototype);
Miner.prototype.constructor = Miner;

Miner.preload = function(game) {
  game.load.spritesheet('miner', 'assets/miner.png', 72, 72, 65, 0);
  game.load.spritesheet('miner-with-gold', 'assets/miner-with-gold.png', 72, 72);
  game.load.spritesheet('mine', 'assets/gold-mine.png', 96, 96);
};

Miner.directions = {
  UP:    1,
  RIGHT: 2,
  DOWN:  4,
  LEFT:  8,
};

Miner.prototype.update = function(){
  var speed = 200;
  // What if we did bitwise ops?
  // 0 => nothing
  // 1 => UP
  // 2 => RIGHT
  // 4 => DOWN
  // 8 => LEFT
  this.facing = 0; // nothing

  if(this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
    this.body.velocity.y = -speed;
    this.facing |= Miner.directions.UP;
  }
  if(this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    this.body.velocity.y = speed;
    this.facing |= Miner.directions.DOWN;
  }
  if(this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
    this.body.velocity.x = -speed;
    this.scale.x = -Math.abs(this.scale.x);
    this.facing |= Miner.directions.LEFT;
  }
  if(this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
    this.body.velocity.x = speed;
    this.scale.x = Math.abs(this.scale.x);
    this.facing |= Miner.directions.RIGHT;
  }

  if(this.facing === 0) {
    this.animations.stop();
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }

  this.play('walk');

  if(this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    thisAttacking = true;
    this.play('attack');
  } else {
    thisAttacking = false;
  }
};

Miner.prototype.play = function(action) {
  var directionKey = [];
  if(this.facing === 0) {
    return;
  }

  if(this.facing & Miner.directions.UP) {
    directionKey.push('up');
  }
  if(this.facing & Miner.directions.DOWN) {
    directionKey.push('down');
  }
  if(this.facing & Miner.directions.RIGHT || this.facing & Miner.directions.LEFT) {
    directionKey.push('right');
  }

  directionKey = directionKey.join('-');

  this.animations.play(action + '-' + directionKey);
};

Miner.prototype.create = function() {
  this.game.physics.arcade.enable(this);

  this.animations.add('walk-up',          [0, 5, 10, 15, 20], 10, true);
  this.animations.add('walk-up-right',    [1, 6, 11, 16, 21], 10, true);
  this.animations.add('walk-right',       [2, 7, 12, 17, 22], 10, true);
  this.animations.add('walk-down-right',  [3, 8, 13, 18, 23], 10, true);
  this.animations.add('walk-down',        [4, 9, 14, 19, 24], 10, true);

  this.animations.add('attack-up',         [25, 30, 35, 40, 45], 10, true);
  this.animations.add('attack-up-right',   [26, 31, 36, 41, 46], 10, true);
  this.animations.add('attack-right',      [27, 32, 37, 42, 47], 10, true);
  this.animations.add('attack-down-right', [28, 33, 38, 43, 48], 10, true);
  this.animations.add('attack-down',       [29, 34, 39, 44, 49], 10, true);

  var hitboxes = this.game.add.group();
  hitboxes.enableBody = true;
  this.addChild(hitboxes);
  this.axHitbox = hitboxes.create(20,-10,null);
  this.axHitbox.anchor.set(0.5,0.5);
  this.axHitbox.body.setSize(50,50,0,0);
};
