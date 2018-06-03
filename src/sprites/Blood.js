export default class Blood extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'blood');

    this.visible = false;
    this.scaleX = this.scaleY = 6;
    //this.anchor.set(0.5,0.5);
    //TODO: this.smoothed = false;

    var bloodAnimation = this.anims.animationManager.create({ key: 'squirt', frames: [0,5,10], frameRate: 5, repeat: false});
    bloodAnimation.onComplete = function(sprite, animation){ sprite.visible=false; };
  }
}
