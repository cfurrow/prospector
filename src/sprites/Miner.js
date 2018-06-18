
export default class Miner {
  static get width() {
    return 72;
  }

  static get height() {
    return 72;
  }

  get scene() {
    return this._scene;
  }

  get sprite() {
    return this._sprite;
  }

  get scale() {
    return 3.0
  }

  get x() {
    return this._sprite.x;
  }

  get y() {
    return this._sprite.y;
  }

  get flipX() {
    return this.sprite.flipX;
  }

  static preload(scene) {
    scene.load.spritesheet('miner', 'assets/miner.png', { frameWidth: Miner.width, frameHeight: Miner.height });
    scene.load.spritesheet('miner-with-gold', 'assets/miner-with-gold.png', {frameWidth: Miner.width, frameHeight: Miner.height});
  }

  static create(scene) {
    var frameRate = 10;

    scene.anims.create({
      key: 'walk-right',
      frames: scene.anims.generateFrameNumbers('miner', {frames: [2, 7, 12, 17, 22]}),
      frameRate: frameRate,
      repeat: -1
    });

    scene.anims.create({
      key: 'walk-up',
      frames: scene.anims.generateFrameNames('miner', {frames: [0,5,10,15,20]}),
      frameRate: frameRate,
      repeat: -1
    });

    scene.anims.create({
      key: 'walk-down',
      frames: scene.anims.generateFrameNames('miner', {frames: [4, 9, 14, 19, 24]}),
      frameRate: frameRate,
      repeat: -1
    });
  }

  constructor(scene, x, y) {
    this._scene  = scene;
    this._sprite = scene.physics.add.sprite(x, y, 'miner');
    this._sprite.scaleX = this._sprite.scaleY = this.scale;
    this._sprite.setCollideWorldBounds(true);

    this.velocity  = 200;
    
    this.cursors  = this._scene.input.keyboard.createCursorKeys();
  }

  update() {
    if(this.cursors.left.isDown) {
      this.moveLeft();
    } else if(this.cursors.right.isDown) {
      this.moveRight();
    } else if(this.cursors.up.isDown) {
      this.moveUp();
    } else if(this.cursors.down.isDown) {
      this.moveDown();
    } else {
      this.stop();
    }
  }

  moveLeft() {
    this.sprite.setVelocityX(-this.velocity);
    this.sprite.flipX = true;
    this.sprite.anims.play('walk-right', true);
  }

  moveRight() {
    this.sprite.setVelocityX(this.velocity);
    this.sprite.flipX = false;
    this.sprite.anims.play('walk-right', true);
  }

  moveUp() {
    this.sprite.setVelocityY(-this.velocity);
    this.sprite.anims.play('walk-up', true);
  }

  moveDown() {
    this.sprite.setVelocityY(this.velocity);
    this.sprite.anims.play('walk-down', true);
  }

  stop() {
    this.sprite.anims.stop();
    this.sprite.setVelocityX(0);
    this.sprite.setVelocityY(0);
  }
}
