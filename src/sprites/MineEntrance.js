export default class MineEntrance extends Phaser.GameObjects.Sprite {
  constructor(game, x, y, properties) {
    let spriteKey = properties.SpriteKey

    super(game, x, y, spriteKey)
    // if(!spriteKey) {
    //   this.width = properties.width
    //   this.height = properties.height
    //   console.log("MineEntrance", {width: this.width, height: this.height})
    // }
    //console.log(properties)

    let centerX, centerY
    if(properties.width && properties.height) {
      centerX = this.x + (properties.width / 2)
      centerY = this.y + (properties.height / 2)
    } else {
      centerX = this.x
      centerY = this.y
    }
    this.x = centerX
    this.y = centerY

    this.anchor.set(0.5, 0.5)
    this.scale.set(2, 2)

    this._onTransition = new Phaser.Signal();

    this.smoothed = false
    this.properties = properties
  }

  get isCollidable() {
    return true;
  }

  get onTransition() {
    return this._onTransition;
  }

  collideWith(obj) {
    console.log("Transition to ", this.properties.LayerName)
    this.onTransition.dispatch(this.properties.LayerName)
  }

  setupPhysics() {
    this.body.immovable = true;
  }

  static preload(scene) {
    scene.load.spritesheet('mine', 'assets/gold-mine.png', {frameWidth: 96, frameHeight:96});
  }
}
