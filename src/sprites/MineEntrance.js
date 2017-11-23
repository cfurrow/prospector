export default class MineEntrance extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'mine')

    this.anchor.set(0.5,0.5)
    this.scale.set(2,2)
    this.smoothed = false
  }
}
