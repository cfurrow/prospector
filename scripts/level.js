Level = function(game, key){
  this.game = game;
  this.key = key;
  this.tileWidth = 16;
  this.tileHeight = 16;

  this.map = game.add.tilemap('cave');
  this.map.addTilesetImage('cave3x');

  this.layer = this.map.createLayer('Overworld');
  this.layer.resizeWorld();

  this.map.createFromObjects('Carl', 'Gold Mine', 'gold-mine3x', 0);
};

Level.preload = function(game) {
  game.load.tilemap('cave', 'assets/levels/cave.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('cave3x', 'assets/levels/cave3x.png');
  game.load.spritesheet('gold-mine3x', 'assets/gold-mine.png', 96, 96);
};
