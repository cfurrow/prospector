/* globals __DEV__ */
import Phaser from 'phaser'
import Miner from '../sprites/Miner'
import Squirrel from '../sprites/Squirrel'
import Blood from '../sprites/Blood'
import MineEntrance from '../sprites/MineEntrance'
import LevelLoader from '../LevelLoader'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.miner = new Miner(game, 0,0);

    this.loader = new LevelLoader(game);
    this.loader.onLayerLoaded.add(() => {
      this.miner.position.set(this.loader.playerStart.x, this.loader.playerStart.y)
    })
    this.map = this.loader.loadMap('cave')
    this.loader.loadLayer('Overworld');
    this.game.add.existing(this.miner);


    //this.squirrels = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
    //this.game.add.group(parent, name, addToStage, enableBody, physicsBodyType);
    this.squirrels = this.game.add.group(this.game.world, 'jfjfjfjf', false, true, Phaser.Physics.ARCADE);
    //this.squirrels.addChild(this.miner);

    for(var i=0; i < 100; i++) {
      this.squirrels.add(Squirrel.createAtRandom(this.game));
    }

    //this.squirrels.sort();

    //this.blood = new Blood(game, 1, 1)

    //this.loader.setupPhysics();
    //this.miner.setupPhysics();

    this.game.camera.follow(this.miner);
  }

  enterGoldMine() {
    //this.mine.kill();
    //this.squirrels.kill();
    this.miner.position.set(550, 200);
    this.layer.destroy();
    this.layer = this.map.createLayer('Gold Mine');
    this.map.setCollisionByExclusion([83,84,85,99,100,101,112,113,128,129,144,145,160,161,115,131,147,148]);
    this.layer.setScale(3);
    this.layer.sendToBack();
    this.layer.resizeWorld();
  }

  // attackConfusion() {
  //   if(!this.miner.attacking) {
  //     this.blood.visible = false;
  //     return;
  //   }
  //   this.blood.visible = true;
  //   var bloodAnimation = this.blood.animations.getAnimation('squirt');
  //   if(!bloodAnimation.isPlaying) {
  //     this.blood.animations.play('squirt');
  //   }
  // }

  doCollision(a, b) {
    b.collideWith(a);
  }

  collisionHandler(miner, squirrel) {
    console.log("killll", squirrel);
    squirrel.kill();
  }

  update() {
    var speed = 200;
    //this.mine.frame = 0; // reset to "off"

    this.game.physics.arcade.collide(this.miner, this.loader.collidables, this.doCollision, null, this);
    this.game.physics.arcade.collide(this.miner, this.layer);

    this.game.physics.arcade.overlap(this.miner, this.squirrels, this.collisionHandler, null, this)
    this.game.physics.arcade.overlap(this.squirrels, undefined, this.collisionHandler);

    this.miner.update();

    this.squirrels.forEachAlive(function(s){ s.update(); });
    //this.squirrels.sort('y', Phaser.Group.SORT_ASCENDING);
  }

  render () {
    this.game.debug.body(this.miner);
    this.squirrels.forEachAlive(function(s){ self.game.debug.body(s); });

    //var self = this;
    // this.game.debug.spriteBounds(this.miner, 'pink', false);
    // this.loader.collidables.forEach( (c) => {
    //   this.game.debug.body(c);
    //   this.game.debug.spriteBounds(c, 'pink', false);
    // } )

    //this.game.debug.body(this.mine);
    //this.game.debug.body(this.axHitbox);
    //this.layer.debug = true;
  }
}
