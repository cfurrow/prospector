Level = function(game, key){
  this.game = game;
  this.key = key;
  this.tileWidth = 48;
  this.tileHeight = 48;

  this.map = game.add.tilemap('cave');
  this.map.addTilesetImage('cave3x');

  this.layer = this.map.createLayer('Overworld');
  this.layer.resizeWorld();

  this.map.createFromObjects('Carl', 'Gold Mine', 'gold-mine3x', 0);

  // this.mine.body.immovable = true;
  // this.mine.body.setSize(40, 40, 16, 48);
  //
  //this.game.physics.arcade.enable([this.mine]);
};

Level.preload = function(game) {
  game.load.tilemap('cave', 'assets/levels/cave.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('cave3x', 'assets/levels/cave3x.png');
  game.load.spritesheet('gold-mine3x', 'assets/gold-mine.png', 96, 96);
};

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
exitGoldMine.call(this);
