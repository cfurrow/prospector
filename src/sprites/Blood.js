export default class Blood extends Phaser.GameObjects.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'blood');

    this.visible = false;
    this.scale.set(6,6);
    this.anchor.set(0.5,0.5);
    this.smoothed = false;

    var bloodAnimation = this.animations.add('squirt', [0,5,10], 5, false);
    bloodAnimation.onComplete.add(function(sprite, animation){ sprite.visible=false; }, this);
  }
}
