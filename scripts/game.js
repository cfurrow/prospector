function preload() {
  Miner.preload(this.game);
  Squirrel.preload(this.game);
  this.game.load.spritesheet('blood', 'assets/blood.png', 32, 32, -1, 32, 32);

  this.game.load.image('confusion', 'assets/infusionsoft.png', 300, 300);

  this.game.load.tilemap('cave', 'assets/levels/cave.json', null, Phaser.Tilemap.TILED_JSON);
  this.game.load.image('cave', 'assets/levels/cave.png');
  this.game.load.image('grass', 'assets/levels/grass.png');
  this.game.load.image('grass2', 'assets/levels/grass2.png');
}

function create() {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  this.miner = new Miner(game, 150, 150);
  this.miner.create();

  this.map = game.add.tilemap('cave');
  this.map.addTilesetImage('cave3', 'cave');

  this.layer = this.map.createLayer('Overworld');
  this.layer.setScale(3);
  this.layer.resizeWorld();

  for(var i=0; i < 500; i++) {
    Squirrel.createAtRandom(this.game);
  }

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

  this.game.physics.arcade.enable([this.mine]);

  this.miner.body.collideWorldBounds = true;
  this.miner.body.allowDrag = true;
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
  this.miner.position.set(550, 200);
  this.layer.destroy();
  this.layer = this.map.createLayer('Gold Mine');
  this.map.setCollisionByExclusion([83,84,85,99,100,101,112,113,128,129,144,145,160,161,115,131,147,148]);
  this.layer.setScale(3);
  this.layer.sendToBack();
  this.layer.resizeWorld();

}

function exitGoldMine() {
  //this.mine bring back to life
  this.layer.destroy();
  this.layer = this.map.createLayer('Overworld');
  this.layer.scale.set(3);
  this.layer.sendToBack();
}

function attackConfusion() {
  if(!this.miner.attacking) {
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
  var speed = 200;
  //this.mine.frame = 0; // reset to "off"

  this.game.physics.arcade.collide(this.miner, this.mine, mineSomeGold, null, this);
  this.game.physics.arcade.collide(this.miner, this.layer);
  //this.game.physics.arcade.collide(this.axHitbox, this.confusion, attackConfusion, null, this);

  this.miner.update();
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
  //this.game.debug.body(this.miner);
  // this.game.debug.body(this.mine);
  //this.game.debug.body(this.axHitbox);
  //this.layer.debug = true;
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
  render: render
});
