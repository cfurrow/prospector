/* globals __DEV__ */
import Phaser from 'phaser'
import Miner from '../sprites/Miner'
import Shepherd from '../sprites/Shepherd'
import Squirrel from '../sprites/Squirrel'
import Blood from '../sprites/Blood'
import MineEntrance from '../sprites/MineEntrance'
import LevelLoader from '../LevelLoader'

export default class extends Phaser.Scene {
  init() {}

  preload() {
  }

  create() {
    let loader = new LevelLoader(this);
    loader.loadMap('cave');
    loader.loadLayer('Overworld');
    
    Miner.create(this);

    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.miner = new Miner(this, 400, 300);
    this.placeDog = false;

    this.anims.create({
      key: 'dog-run',
      frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });


  }

  update() {
    this.miner.update();

    if(this.spaceBar.isDown) {
      this.placeDog = true;
    } else if (this.spaceBar.isUp && this.placeDog) {
      this.dog = new Shepherd(this, this.miner.x, this.miner.y);
      this.dog.sprite.flipX = !this.miner.flipX;
      this.placeDog = false;
    }
  }

  render () {
  }
}
