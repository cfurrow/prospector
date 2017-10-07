Miner = function(game, x, y) {
  Phaser.Sprite.call(this,game, x, y, 'miner');
  this.scale.set(3,3);
  this.anchor.set(0.5, 0.8);
  this.smoothed = false;

  this.controller       = this.game.input.keyboard.createCursorKeys();
  this.controller.space = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  this.xWalkFrame = null;
  this.yWalkFrame = null;

  game.add.existing(this);
};

Miner.prototype = Object.create(Phaser.Sprite.prototype);
Miner.prototype.constructor = Miner;

Miner.preload = function(game) {
  game.load.spritesheet('miner', 'assets/miner.png', 72, 72, 65, 0);
  game.load.spritesheet('miner-with-gold', 'assets/miner-with-gold.png', 72, 72);
  game.load.spritesheet('mine', 'assets/gold-mine.png', 96, 96);
};

Miner.facing = {
  UP:    1,
  RIGHT: 2,
  DOWN:  4,
  LEFT:  8,

};
Miner.action = {
  WALK: 1,
  ATTACK: 2
};

Miner.prototype.update = function() {
  var speed = 200;

  if(this.controller.left.isDown) {
    this.action = 'walk';
    this.scale.x = -Math.abs(this.scale.x);
    this.body.velocity.x = -speed;
    this.xWalkFrame = this.xActionFrame = 'right';
  } else if(this.controller.right.isDown) {
    this.action = 'walk';
    this.scale.x = Math.abs(this.scale.x);
    this.body.velocity.x = speed;
    this.xWalkFrame = this.xActionFrame = 'right';
  } else {
    this.xWalkFrame = null;
    this.body.velocity.x = 0;
  }

  if(this.controller.up.isDown) {
    this.action = 'walk';
    this.body.velocity.y = -speed;
    this.yWalkFrame = this.yActionFrame = 'up';
  }else if(this.controller.down.isDown) {
    this.action = 'walk';
    this.body.velocity.y = speed;
    this.yWalkFrame = this.yActionFrame = 'down';
  } else {
    this.yWalkFrame = null;
    this.body.velocity.y = 0;
  }

  if(!this._directionKeyIsDown()) {
    this.action = null;
  }

  if(this.controller.space.isDown) {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.action = 'attack';
  }

  this.animate();
};

Miner.prototype._directionKeyIsDown = function() {
  return this._leftRightIsDown() ||
         this._upDownIsDown();
};

Miner.prototype._leftRightIsDown = function() {
  return this.controller.left.isDown ||
         this.controller.right.isDown;
};

Miner.prototype._upDownIsDown = function() {
  return this.controller.up.isDown ||
         this.controller.down.isDown;
};

Miner.prototype.animate = function() {
  var directionKey = [];
  var animationKey = null;

  if(this.action === null) {
    this.animations.stop();
    return;
  }

  if(this.yWalkFrame) {
    directionKey.push(this.yWalkFrame);
  }

  if(this.xWalkFrame) {
    directionKey.push(this.xWalkFrame);
  }

  if(this.action == 'attack') {
    directionKey = this.animations.currentAnim.name.replace(/^(walk|attack)-/, '');
  } else {
    directionKey = directionKey.join('-');
  }
  animationKey = this.action + '-' + directionKey;

  this.animations.play(animationKey);
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
