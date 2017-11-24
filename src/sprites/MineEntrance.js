export default class MineEntrance extends Phaser.Sprite {
  constructor(game, x, y, properties) {
    let spriteKey = properties.SpriteKey
    super(game, x, y, spriteKey)
    //console.log(properties)

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
    // load new layer????
    // load new map???
    this.onTransition.dispatch(this.properties.LayerName)
  }

  setupPhysics() {
    this.body.immovable = true;
    //this.body.setSize(this.width-8, this.height-8, this.width/3, this.height);
  }

  static preload(game) {
    game.load.spritesheet('mine', 'assets/gold-mine.png', 96, 96);
  }
}
