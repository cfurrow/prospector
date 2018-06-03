import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Miner from '../sprites/Miner'
import Squirrel from '../sprites/Squirrel'
import MineEntrance from '../sprites/MineEntrance'

export default class extends Phaser.Scene {
  init () {}

  preload () {
    // this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    // centerGameObjects([this.loaderBg, this.loaderBar])

    // this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    Miner.preload(this);
    Squirrel.preload(this);
    MineEntrance.preload(this);

    this.load.spritesheet('blood', 'assets/blood.png', { frameWidth: 32, frameHeight: 32 });

    this.load.image('confusion',   'assets/infusionsoft.png', 300, 300);

    this.load.tilemapTiledJSON('cave', 'assets/levels/cave.json');
    this.load.image('cave', 'assets/levels/cave.png');
    // this.game.load.image('grass', 'assets/levels/grass.png');
    // this.game.load.image('grass2', 'assets/levels/grass2.png');
  }

  create () {
    this.scene.start('Game')
  }
}
