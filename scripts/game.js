function preload() {
  this.game.load.spritesheet('miner', '/assets/miner.png', 72, 72, 65, 10);
  this.game.load.spritesheet('miner-with-gold', '/assets/miner-with-gold.png', 72, 72);
  this.game.load.spritesheet('mine', '/assets/gold-mine.png', 96, 96);
}

function create() {
  this.miner = this.game.add.sprite(72, 72, 'miner', 2);
  this.miner.anchor.set(0.5, 0.5);
  this.miner.scale.set(3,3);
  this.miner.smoothed = false;
  this.miner.animations.add('walk-up',         [0, 5, 10, 15, 20], 10, true);
  this.miner.animations.add('walk-up-right',   [1, 6, 11, 16, 21], 10, true);
  this.miner.animations.add('walk-right',      [2, 7, 12, 17, 22], 10, true);
  this.miner.animations.add('walk-down-right', [3, 8, 13, 18, 23], 10, true);
  this.miner.animations.add('walk-down',       [4, 9, 14, 19, 24], 10, true);
}

function update() {
  var speed = 5;

  if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
    this.miner.x -= speed;
    this.miner.scale.x = -Math.abs(this.miner.scale.x);

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)){
      this.miner.animations.play('walk-down-right');
      this.miner.y += speed;
    }else if(this.game.input.keyboard.isDown(Phaser.KeyCode.UP)){
      this.miner.animations.play('walk-up-right');
      this.miner.y -= speed;
    }else {
      this.miner.animations.play('walk-right');
    }
  }
  else if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
    this.miner.x += speed;
    this.miner.scale.x = Math.abs(this.miner.scale.x);

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)){
      this.miner.animations.play('walk-down-right');
      this.miner.y += speed;
    }else if(this.game.input.keyboard.isDown(Phaser.KeyCode.UP)){
      this.miner.animations.play('walk-up-right');
      this.miner.y -= speed;
    }else {
      this.miner.animations.play('walk-right');
    }
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
    this.miner.y -= speed;
    this.miner.animations.play('walk-up');
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    this.miner.y += speed;
    this.miner.animations.play('walk-down');
  }
  else {
    this.miner.animations.stop();
  }
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});
