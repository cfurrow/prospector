function preload() {
  this.game.load.spritesheet('miner', 'assets/miner.png', 72, 72, 65, 0);
  this.game.load.spritesheet('miner-with-gold', 'assets/miner-with-gold.png', 72, 72);
  this.game.load.spritesheet('mine', 'assets/gold-mine.png', 96, 96);
  this.game.load.spritesheet('blood', 'assets/blood.png', 32, 32, -1, 32, 32);

  this.game.load.image('confusion', 'assets/infusionsoft.png', 300, 300);

  this.game.load.tilemap('cave', 'assets/levels/cave.json', null, Phaser.Tilemap.TILED_JSON);
  this.game.load.image('cave', 'assets/levels/cave.png');
  this.game.load.image('grass', 'assets/levels/grass.png');
  this.game.load.image('grass2', 'assets/levels/grass2.png');
}

var Directions = {
  UP: 0,
  UP_RIGHT: 1,
  RIGHT: 2,
  DOWN_RIGHT: 3,
  DOWN: 4,
  DOWN_LEFT: 5,
  LEFT: 6,
  UP_LEFT: 7
};

function create() {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  this.map = game.add.tilemap('cave');
  this.map.addTilesetImage('cave3', 'cave');
  this.map.addTilesetImage('overworld', 'grass');
  this.map.addTilesetImage('grass2.png');
  this.map.addTilesetImage('infusionsoft.png', 'confusion');
  this.layer = this.map.createLayer('Overworld');
  this.layer.scale.set(3);
  this.layer.resizeWorld();
  // layer = this.map.createLayer('Gold Mine');
  // layer.scale.set(3);

  this.miner = this.game.add.sprite(150, 150, 'miner', 2);
  this.miner.anchor.set(0.5, 0.5);
  this.miner.scale.set(3,3);
  this.miner.smoothed = false;
  this.miner.animations.add('walk-up',          [0, 5, 10, 15, 20], 10, true);
  this.miner.animations.add('walk-up-right',    [1, 6, 11, 16, 21], 10, true);
  this.miner.animations.add('walk-right',       [2, 7, 12, 17, 22], 10, true);
  this.miner.animations.add('walk-down-right',  [3, 8, 13, 18, 23], 10, true);
  this.miner.animations.add('walk-down',        [4, 9, 14, 19, 24], 10, true);

  this.miner.animations.add('swing-up',         [25, 30, 35, 40, 45], 10, true);
  this.miner.animations.add('swing-up-right',   [26, 31, 36, 41, 46], 10, true);
  this.miner.animations.add('swing-right',      [27, 32, 37, 42, 47], 10, true);
  this.miner.animations.add('swing-down-right', [28, 33, 38, 43, 48], 10, true);
  this.miner.animations.add('swing-down',       [29, 34, 39, 44, 49], 10, true);

  var hitboxes = this.game.add.group();
  hitboxes.enableBody = true;
  this.miner.addChild(hitboxes);
  this.axHitbox = hitboxes.create(20,-10,null);
  this.axHitbox.anchor.set(0.5,0.5);
  this.axHitbox.body.setSize(50,50,0,0);

  this.mine = this.game.add.sprite(500, 400, 'mine', 0);
  this.mine.anchor.set(0.5,0.5);
  this.mine.scale.set(2,2);
  this.mine.smoothed = false;

  this.blood = this.game.add.sprite(0,0, 'blood');
  this.blood.visible = false;
  this.blood.scale.set(6,6);
  this.blood.anchor.set(0.5,0.5);
  this.blood.smoothed = false;
  var bloodAnimation = this.blood.animations.add('squirt', [0,5,10], 5, false);
  bloodAnimation.onComplete.add(function(sprite, animation){ sprite.visible=false; }, this);

  // this.confusion = this.game.add.sprite(50, 550, 'confusion');
  // this.confusion.anchor.set(0.5, 0.5);
  // this.confusion.scale.set(0.3, 0.3);
  // this.confusion.addChild(this.blood);

  // var confusionTween = this.game.add.tween(this.confusion);
  // confusionTween.to({x: 750}, 5500, Phaser.Easing.Elastic.InOut, true, 0, -1, true);

  this.game.physics.arcade.enable([this.miner, this.mine]);

  this.miner.body.collideWorldBounds = true;
  this.miner.body.setSize(72 / this.miner.scale.x, 72 / this.miner.scale.y, 72 / this.miner.scale.x, 72 / this.miner.scale.y);

  this.mine.body.immovable = true;
  this.mine.body.setSize(40, 40, 16, 48);

  this.game.camera.follow(this.miner);
  exitGoldMine.call(this);
}

function mineSomeGold() {
  this.mine.frame = 1;
  enterGoldMine.call(this);
}

function enterGoldMine() {
  this.mine.kill();
  this.miner.position.set(550, 150);
  this.layer.destroy();
  this.layer = this.map.createLayer('Gold Mine');
  this.layer.scale.set(3);
  this.layer.sendToBack();
}

function exitGoldMine() {
  //this.mine bring back to life
  this.layer.destroy();
  this.layer = this.map.createLayer('Overworld');
  this.layer.scale.set(3);
  this.layer.sendToBack();
}

function attackConfusion() {
  if(!this.minerAttacking) {
    this.blood.visible = false;
    return;
  }
  this.blood.visible = true;
  var bloodAnimation = this.blood.animations.getAnimation('squirt');
  if(!bloodAnimation.isPlaying) {
    this.blood.animations.play('squirt');
  }
}

function update() {
  var speed = 5;
  //this.mine.frame = 0; // reset to "off"

  this.game.physics.arcade.collide(this.miner, this.mine, mineSomeGold, null, this);
  //this.game.physics.arcade.collide(this.axHitbox, this.confusion, attackConfusion, null, this);

  if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
    this.miner.x -= speed;
    this.miner.scale.x = -Math.abs(this.miner.scale.x);
    this.direction = Directions.LEFT; // left;

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)){
      this.miner.animations.play('walk-down-right');
      this.miner.y += speed;
      this.direction = Directions.DOWN_LEFT;
    }else if(this.game.input.keyboard.isDown(Phaser.KeyCode.UP)){
      this.miner.animations.play('walk-up-right');
      this.miner.y -= speed;
      this.direction = Directions.UP_LEFT;
    }else {
      this.miner.animations.play('walk-right');
    }
  }
  else if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
    this.miner.x += speed;
    this.miner.scale.x = Math.abs(this.miner.scale.x);
    this.direction = Directions.RIGHT;

    if(this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)){
      this.miner.animations.play('walk-down-right');
      this.miner.y += speed;
      this.direction = Directions.DOWN_RIGHT;
    }else if(this.game.input.keyboard.isDown(Phaser.KeyCode.UP)){
      this.miner.animations.play('walk-up-right');
      this.miner.y -= speed;
      this.direction = Directions.DOWN_LEFT;
    }else {
      this.miner.animations.play('walk-right');
    }
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
    this.miner.y -= speed;
    this.miner.animations.play('walk-up');
    this.direction = Directions.UP;
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    this.miner.y += speed;
    this.miner.animations.play('walk-down');
    this.direction = Directions.DOWN;
  } else {
    if(!this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
      this.miner.animations.stop();
    }
  }

  if(this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
    this.minerAttacking = true;
    attack(this.miner, this.direction);
  } else {
    this.minerAttacking = false;
  }
}

function attack(miner, direction) {
  var animation = null;
  switch(direction) {
    case Directions.UP:
      animation = 'swing-up';
      break;
    case Directions.UP_RIGHT:
      animation = 'swing-up-right';
      break;
    case Directions.RIGHT:
      animation = 'swing-right';
      break;
    case Directions.DOWN_RIGHT:
      animation = 'swing-down-right';
      break;
    case Directions.DOWN:
      animation = 'swing-down';
      break;
    case Directions.DOWN_LEFT:
      animation = 'swing-down-right';
      break;
    case Directions.LEFT:
      animation = 'swing-right';
      break;
    case Directions.UP_LEFT:
      animation = 'swing-up-right';
      break;
    default:
      animation = 'swing-right';
      break;
  }

  miner.animations.play(animation);
}

function render () {
  // this.game.debug.body(this.miner);
  // this.game.debug.body(this.mine);
  //this.game.debug.body(this.axHitbox);
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
  render: render
});
