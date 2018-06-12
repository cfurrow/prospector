/* globals __DEV__ */
import Phaser from 'phaser'
import Miner from '../sprites/Miner'
import Squirrel from '../sprites/Squirrel'
import Blood from '../sprites/Blood'
import MineEntrance from '../sprites/MineEntrance'
import LevelLoader from '../LevelLoader'

export default class extends Phaser.Scene {
  init() {}

  preload() {
    this.load.image('jake',      'assets/jake.png');
    this.load.spritesheet('dog', 'assets/dog_brown.png', {frameWidth: 45, frameHeight: 25});
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.miner = new Miner(this, 400, 300);

    this.anims.create({
      key: 'dog-run',
      frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    })

    //this.anims.create({})

    //this.miner.anims.play('walk-right');

    //this.cameras.main.startFollow(this.miner);
  }

  update() {

    if(this.cursors.left.isDown) {
      this.miner.moveLeft();
    } else if(this.cursors.right.isDown) {
      this.miner.moveRight();
    } else if(this.cursors.up.isDown) {
      this.miner.moveUp();
    } else if(this.cursors.down.isDown) {
      this.miner.moveDown();
    } else {
      this.miner.stop();
    }

    if(this.spaceBar.isDown) {
      this.dog = this.physics.add.sprite(this.miner.x, this.miner.y, 'dog');
      this.dog.scaleX = this.dog.scaleY = 3.0;
      this.dog.anims.play('dog-run', true);
    }
  }

  render () {
  }
}
