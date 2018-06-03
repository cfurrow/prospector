export default class Miner extends Phaser.GameObjects.Sprite {
  static get width() {
    return 72
  }

  static get height() {
    return 72;
  }

  constructor(scene, x, y) {
    super(scene, x, y, 'miner');

    this.scaleX = this.scaleY = 3;
    //this.anchor.set(0.5, 0.8);
    //this.smoothed = false;

    this.controller       = scene.input.keyboard.createCursorKeys();
    this.controller.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.xWalkFrame = null;
    this.yWalkFrame = null;
  }

  static preload(scene) {
    // spritesheet(key, url, frameWidth, frameHeight [, frameMax] [, margin] [, spacing] [, skipFrames])
    scene.load.spritesheet('miner', 'assets/miner.png', {frameWidth: Miner.width, frameHeight: Miner.height});
    scene.load.spritesheet('miner-with-gold', 'assets/miner-with-gold.png', {frameWidth: Miner.width, frameHeight: Miner.height});
  }

  static get facing() {
    return {
      UP:    1,
      RIGHT: 2,
      DOWN:  4,
      LEFT:  8
    };
  }

  static get action() {
    return {
      WALK: 1,
      ATTACK: 2
    };
  }

  update() {
    var speed = 200;

    if(this.controller.left.isDown) {
      this.action = 'walk';
      // TODO: use flip thing
      this.scaleX = -Math.abs(this.scale.x);
      // TODO
      //this.body.velocity.x = -speed;
      this.xWalkFrame = this.xActionFrame = 'right';
    } else if(this.controller.right.isDown) {
      this.action = 'walk';
      // TODO: use flip
      this.scaleX = Math.abs(this.scale.x);
      // TODO
      //this.body.velocity.x = speed;
      this.xWalkFrame = this.xActionFrame = 'right';
    } else {
      this.xWalkFrame = null;
      // TODO
      //this.body.velocity.x = 0;
    }

    if(this.controller.up.isDown) {
      this.action = 'walk';
      // TODO this.body.velocity.y = -speed;
      this.yWalkFrame = this.yActionFrame = 'up';
    }else if(this.controller.down.isDown) {
      this.action = 'walk';
      // TODO this.body.velocity.y = speed;
      this.yWalkFrame = this.yActionFrame = 'down';
    } else {
      this.yWalkFrame = null;
      //TODO this.body.velocity.y = 0;
    }

    if(!this._directionKeyIsDown()) {
      this.action = null;
    }

    if(this.controller.space.isDown) {
      //TODO his.body.velocity.x = 0;
      //TODO this.body.velocity.y = 0;
      this.action = 'attack';
    }

    this.animate();
  }

  _directionKeyIsDown() {
    return this._leftRightIsDown() ||
           this._upDownIsDown();
  }

  _leftRightIsDown() {
    return this.controller.left.isDown ||
           this.controller.right.isDown;
  }

  _upDownIsDown() {
    return this.controller.up.isDown ||
           this.controller.down.isDown;
  }

  animate() {
    var directionKey = [];
    var animationKey = null;

    if(this.action === null) {
      this.anims.stop();
      return;
    }

    if(this.yWalkFrame) {
      directionKey.push(this.yWalkFrame);
    }

    if(this.xWalkFrame) {
      directionKey.push(this.xWalkFrame);
    }

    if(this.action == 'attack') {
      directionKey = this.animations.currentAnim.name.replace(/^(walk|attack)-/, '');
    } else {
      directionKey = directionKey.join('-');
    }
    animationKey = this.action + '-' + directionKey;

    this.animations.play(animationKey);
  }

  create() {
    //this.game.physics.arcade.enable(this);

    this.anims.animationManager.create({ key: 'walk-up',          frames:[0, 5, 10, 15, 20],    frameRate: 10, repeat: true});
    this.anims.animationManager.create({ key: 'walk-up-right',    frames:[1, 6, 11, 16, 21],    frameRate: 10, repeat: true});
    this.anims.animationManager.create({ key: 'walk-right',       frames:[2, 7, 12, 17, 22],    frameRate: 10, repeat: true});
    this.anims.animationManager.create({ key: 'walk-down-right',  frames:[3, 8, 13, 18, 23],    frameRate: 10, repeat: true});
    this.anims.animationManager.create({ key: 'walk-down',        frames:[4, 9, 14, 19, 24],    frameRate: 10, repeat: true});

    this.anims.animationManager.create({ key: 'attack-up',        frames: [25, 30, 35, 40, 45], frameRate: 10, repeat: true});
    this.anims.animationManager.create({ key: 'attack-up-right',  frames: [26, 31, 36, 41, 46], frameRate: 10, repeat: true});
    this.anims.animationManager.create({ key: 'attack-right',     frames: [27, 32, 37, 42, 47], frameRate: 10, repeat: true});
    this.anims.animationManager.create({ key: 'attack-down-right',frames: [28, 33, 38, 43, 48], frameRate: 10, repeat: true});
    this.anims.animationManager.create({ key: 'attack-down',      frames: [29, 34, 39, 44, 49], frameRate: 10, repeat: true});

    //var hitboxes = this.scene.add.group();
    //hitboxes.enableBody = true;
    //this.addChild(hitboxes);

    // this.axHitbox = hitboxes.create(20,-10,null);
    // this.axHitbox.anchor.set(0.5,0.5);
    // this.axHitbox.body.setSize(50,50,0,0);
  }

  setupPhysics() {
    // TODO
    // this.body.collideWorldBounds = true;
    // this.body.allowDrag = true;
    // this.body.setSize(Miner.width / this.scale.x, Miner.height / this.scale.y, Miner.width / this.scale.x, Miner.height / this.scale.y);
  }
}
