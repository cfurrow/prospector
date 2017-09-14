Miner = function(game, x, y) {
  Phaser.Sprite.call(this,game, x, y, 'miner');
  this.scale.set(3,3);
  this.anchor.set(0.5, 0.5);
  this.smoothed = false;

  game.add.existing(this);
};

Miner.prototype = Object.create(Phaser.Sprite.prototype);
Miner.prototype.constructor = Miner;

Miner.directions = {
  UP: 0,
  UP_RIGHT: 1,
  RIGHT: 2,
  DOWN_RIGHT: 3,
  DOWN: 4,
  DOWN_LEFT: 5,
  LEFT: 6,
  UP_LEFT: 7
};

Miner.prototype.update = function(){
  var speed = 200;
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
    // this.x -= speed;
    this.body.velocity.x = -speed;
    this.scale.x = -Math.abs(this.scale.x);
    this.direction = Miner.directions.LEFT; // left;

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)){
      this.animations.play('walk-down-right');
      this.body.velocity.y = speed;
      // this.y += speed;
      this.direction = Miner.directions.DOWN_LEFT;
    }else if(this.game.input.keyboard.isDown(Phaser.KeyCode.UP)){
      this.animations.play('walk-up-right');
      this.body.velocity.y = -speed;
      // this.y -= speed;
      this.direction = Miner.directions.UP_LEFT;
    }else {
      this.animations.play('walk-right');
    }
  }
  else if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
    this.body.velocity.x = speed;
    // this.x += speed;
    this.scale.x = Math.abs(this.scale.x);
    this.direction = Miner.directions.RIGHT;

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)){
      this.animations.play('walk-down-right');
      this.body.velocity.y = speed;
      // this.y += speed;
      this.direction = Miner.directions.DOWN_RIGHT;
    }else if(this.game.input.keyboard.isDown(Phaser.KeyCode.UP)){
      this.animations.play('walk-up-right');
      this.body.velocity.y = -speed;
      // this.y -=speed;
      this.direction = Miner.directions.DOWN_LEFT;
    }else {
      this.animations.play('walk-right');
    }
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
    this.body.velocity.y = -speed;
    // this.y -= speed;
    this.animations.play('walk-up');
    this.direction = Miner.directions.UP;
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    this.body.velocity.y = speed;
    // this.y += speed;
    this.animations.play('walk-down');
    this.direction = Miner.directions.DOWN;
  } else {
    if(!this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
      this.animations.stop();
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }
  }

  if(this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    thisAttacking = true;
    attack(this, this.direction);
  } else {
    thisAttacking = false;
  }
};

Miner.preload = function(game) {
  game.load.spritesheet('miner', 'assets/miner.png', 72, 72, 65, 0);
  game.load.spritesheet('miner-with-gold', 'assets/miner-with-gold.png', 72, 72);
  game.load.spritesheet('mine', 'assets/gold-mine.png', 96, 96);
};

Miner.prototype.create = function() {
  this.game.physics.arcade.enable(this);

  this.animations.add('walk-up',          [0, 5, 10, 15, 20], 10, true);
  this.animations.add('walk-up-right',    [1, 6, 11, 16, 21], 10, true);
  this.animations.add('walk-right',       [2, 7, 12, 17, 22], 10, true);
  this.animations.add('walk-down-right',  [3, 8, 13, 18, 23], 10, true);
  this.animations.add('walk-down',        [4, 9, 14, 19, 24], 10, true);

  this.animations.add('swing-up',         [25, 30, 35, 40, 45], 10, true);
  this.animations.add('swing-up-right',   [26, 31, 36, 41, 46], 10, true);
  this.animations.add('swing-right',      [27, 32, 37, 42, 47], 10, true);
  this.animations.add('swing-down-right', [28, 33, 38, 43, 48], 10, true);
  this.animations.add('swing-down',       [29, 34, 39, 44, 49], 10, true);

  var hitboxes = this.game.add.group();
  hitboxes.enableBody = true;
  this.addChild(hitboxes);
  this.axHitbox = hitboxes.create(20,-10,null);
  this.axHitbox.anchor.set(0.5,0.5);
  this.axHitbox.body.setSize(50,50,0,0);
};
