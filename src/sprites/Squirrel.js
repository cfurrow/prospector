export default class Squirrel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(game, x, y, 'squirrel', 0)
    
    this.scaleX = this.scaleY = 2;
    this.setOrigin(0.5, 1);
  
    this.animations.add('idle', [0,1,2,3,4,5,6,7], 10, true);
    this.animations.add('run', [32,33,34], 7, true);
    this.animations.play('run');

    this.lastChange = 0;
    game.physics.arcade.enable(this);
    this.collideWorldBounds = true;
  }

  static preload(scene) {
    scene.load.spritesheet('squirrel', 'assets/Monster-squirrel.png', {frameWidth: 32, frameHeight: 32});
  }

  static createAtRandom(game) {
    var rnd = game.rnd;
    var x = rnd.between(0,game.world.width);
    var y = rnd.between(0, game.world.height);
    var squirrel = new Squirrel(game, x, y);
    game.add.existing(squirrel);
    return squirrel;
  }

  update() {
    var speed = 4;

    var i = this.game.rnd.integerInRange(0,100);
    var now = this.game.time.now;
    var lastChangeDiff = now - this.lastChange;
    if(lastChangeDiff > this.game.rnd.between(300,1200)) {
      this.lastChange = this.game.time.now;
      if(i < 33) {
        this.movingRight = true;
        this.movingLeft = false;
      } else if (i < 66) {
        this.movingRight = false;
        this.movingLeft = true;
      } else {
        this.movingRight = false;
        this.movingLeft = false;
      }
    }

    if(this.movingRight) {
      this.position.x += speed;
      this.scale.x = Math.abs(this.scale.x);
      this.animations.play('run');
    }else if(this.movingLeft) {
      this.scale.x = -Math.abs(this.scale.x);
      this.position.x -= speed;
      this.animations.play('run');
    } else {
      this.animations.play('idle');
    }
  }
}
