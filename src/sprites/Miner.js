
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
      key: 'walk-up-right',
      frames: scene.anims.generateFrameNames('miner', {frames: [1,6,11,16,21]}),
      frameRate: frameRate,
      repeat: -1
    });

    scene.anims.create({
      key: 'walk-up-left',
      frames: scene.anims.generateFrameNames('miner', {frames: [1,6,11,16,21]}),
      frameRate: frameRate,
      repeat: -1
    });

    scene.anims.create({
      key: 'walk-down',
      frames: scene.anims.generateFrameNames('miner', {frames: [4, 9, 14, 19, 24]}),
      frameRate: frameRate,
      repeat: -1
    });

    scene.anims.create({
      key: 'walk-down-right',
      frames: scene.anims.generateFrameNames('miner', {frames: [3, 8, 13, 18, 23]}),
      frameRate: frameRate,
      repeat: -1
    });

    scene.anims.create({
      key: 'walk-down-left',
      frames: scene.anims.generateFrameNames('miner', {frames: [3, 8, 13, 18, 23]}),
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

    this.xWalkFrame = null;
    this.yWalkFrame = null;
  }

  update() {
    // if(this.cursors.left.isDown) {
    //   this.moveLeft();
    // } else if(this.cursors.right.isDown) {
    //   this.moveRight();
    // } else if(this.cursors.up.isDown) {
    //   this.moveUp();
    // } else if(this.cursors.down.isDown) {
    //   this.moveDown();
    // } else {
    //   this.stop();
    // }

    if(this.cursors.left.isDown) {
      this.action = 'walk';
      this.moveLeft();
      this.xWalkFrame = this.xActionFrame = 'right';
    } else if(this.cursors.right.isDown) {
      this.action = 'walk';
      this.moveRight();
      this.xWalkFrame = this.xActionFrame = 'right';
    } else {
      this.xWalkFrame = null;
      this.sprite.setVelocityX(0);
    }

    if(this.cursors.up.isDown) {
      this.action = 'walk';
      this.moveUp();
      this.yWalkFrame = this.yActionFrame = 'up';
    }else if(this.cursors.down.isDown) {
      this.action = 'walk';
      this.yWalkFrame = this.yActionFrame = 'down';
      this.moveDown();
    } else {
      this.yWalkFrame = null;
      this.sprite.setVelocityY(0);
    }

    if(!this._directionKeyIsDown()) {
      this.action = null;
    }

    // if(this.controller.space.isDown) {
    //   this.body.velocity.x = 0;
    //   this.body.velocity.y = 0;
    //   this.action = 'attack';
    // }

    this.animate();
  }

  moveLeft() {
    this.sprite.setVelocityX(-this.velocity);
    this.sprite.flipX = true;
  }

  moveRight() {
    this.sprite.setVelocityX(this.velocity);
    this.sprite.flipX = false;
  }

  moveUp() {
    this.sprite.setVelocityY(-this.velocity);
  }

  moveDown() {
    this.sprite.setVelocityY(this.velocity);
  }

  stop() {
    this.sprite.anims.stop();
    this.sprite.setVelocityX(0);
    this.sprite.setVelocityY(0);
  }

  animate() {
    let directionKey = [];
    let animationKey = null

    if(this.action === null) {
      this.sprite.anims.stop();
      return;
    }

    if(this.yWalkFrame) {
      directionKey.push(this.yWalkFrame);
    }

    if(this.xWalkFrame) {
      directionKey.push(this.xWalkFrame);
    }

    if(this.action == 'attack') {
      //directionKey = this.animations.currentAnim.name.replace(/^(walk|attack)-/, '');
    } else {
      directionKey = directionKey.join('-');
    }
    animationKey = this.action + '-' + directionKey;

    console.log(`Playing animation ${animationKey}`)
    this.sprite.anims.play(animationKey, true);
  }

  _directionKeyIsDown() {
    return this.cursors.up.isDown ||
      this.cursors.down.isDown ||
      this.cursors.left.isDown ||
      this.cursors.right.isDown;
  }
}
