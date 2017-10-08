function preload() {
  Miner.preload(this.game);
  Squirrel.preload(this.game);
  Level.preload(this.game);
  this.game.load.spritesheet('blood', 'assets/blood.png', 32, 32, -1, 32, 32);

  this.game.load.image('confusion', 'assets/infusionsoft.png', 300, 300);

  this.game.load.image('grass', 'assets/levels/grass.png');
  this.game.load.image('grass2', 'assets/levels/grass2.png');
}

function create() {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  this.miner = new Miner(game, 150, 200);
  this.miner.create();

  this.level = new Level(this.game);

  // this.map = game.add.tilemap('cave');
  // this.map.addTilesetImage('cave3', 'cave');

  // this.layer = this.map.createLayer('Overworld');
  // this.layer.setScale(3);
  // this.layer.resizeWorld();

  this.group = game.add.group();
  this.group.addChild(this.miner);

  for(var i=0; i < 20; i++) {
    this.group.addChild(Squirrel.createAtRandom(this.game));
  }
  this.group.sort();

  this.blood = this.game.add.sprite(0,0, 'blood');
  this.blood.visible = false;
  this.blood.scale.set(6,6);
  this.blood.anchor.set(0.5,0.5);
  this.blood.smoothed = false;
  var bloodAnimation = this.blood.animations.add('squirt', [0,5,10], 5, false);
  bloodAnimation.onComplete.add(function(sprite, animation){ sprite.visible=false; }, this);

  //this.game.physics.arcade.enable([this.mine]);

  this.miner.body.collideWorldBounds = true;
  this.miner.body.allowDrag = true;
  this.miner.body.setSize(72 / this.miner.scale.x, 72 / this.miner.scale.y, 72 / this.miner.scale.x, 72 / this.miner.scale.y);

  // this.mine.body.immovable = true;
  // this.mine.body.setSize(40, 40, 16, 48);

  this.game.camera.follow(this.miner);

  exitGoldMine.call(this);
}

function mineSomeGold() {
  //this.mine.frame = 1;
  //enterGoldMine.call(this);
}

function enterGoldMine() {
  this.mine.kill();
  //this.group.kill();
  this.miner.position.set(550, 200);
  // this.layer.destroy();
  // this.layer = this.map.createLayer('Gold Mine');
  this.map.setCollisionByExclusion([83,84,85,99,100,101,112,113,128,129,144,145,160,161,115,131,147,148]);
  // this.layer.setScale(3);
  // this.layer.sendToBack();
  // this.layer.resizeWorld();
}

function exitGoldMine() {
  //this.mine bring back to life
  // this.layer.destroy();
  // this.layer = this.map.createLayer('Overworld');
  // this.layer.scale.set(3);
  // this.layer.sendToBack();
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

  //this.game.physics.arcade.collide(this.miner, this.mine, mineSomeGold, null, this);
  this.game.physics.arcade.collide(this.miner, this.level.layer);

  this.miner.update();

  this.group.forEachAlive(function(s){ s.update(); });
  this.group.sort('y', Phaser.Group.SORT_ASCENDING);
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
