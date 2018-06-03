/* globals __DEV__ */
import Phaser from 'phaser'
import Miner from '../sprites/Miner'
import Squirrel from '../sprites/Squirrel'
import Blood from '../sprites/Blood'
import MineEntrance from '../sprites/MineEntrance'
import LevelLoader from '../LevelLoader'

export default class extends Phaser.Scene {
  init() {}
  preload() {}

  create() {
    this.miner = new Miner(this, 0,0);
    this.miner.create();

    this.loader = new LevelLoader(this);
    this.events.on('onLayerLoaded', () => {
      console.log(`===== onLayerLoaded fired`)
      console.log(`===== setting miner to position ${this.loader.playerStart.x}, ${this.loader.playerStart.y}`)
      this.miner.setPosition(this.loader.playerStart.x, this.loader.playerStart.y)
    });

    this.map = this.loader.loadMap('cave')
    this.loader.loadLayer('Overworld');

    debugger
    this.add.existing(this.miner);
    // this.group = this.add.group();
    // this.group.add(this.miner);

    // for(var i=0; i < 500; i++) {
    //   this.group.addChild(Squirrel.createAtRandom(this.game));
    // }
    //this.group.sort();

    this.blood = new Blood(this, 1, 1)

    // this.confusion = this.game.add.sprite(50, 550, 'confusion');
    // this.confusion.anchor.set(0.5, 0.5);
    // this.confusion.scale.set(0.3, 0.3);
    // this.confusion.addChild(this.blood);

    // var confusionTween = this.game.add.tween(this.confusion);
    // confusionTween.to({x: 750}, 5500, Phaser.Easing.Elastic.InOut, true, 0, -1, true);

    //this.loader.setupPhysics();
    this.miner.setupPhysics();
    this.cameras.main.startFollow(this.miner);
  }

  mineSomeGold() {
    //this.mine.frame = 1;
    this.enterGoldMine.call(this);
  }

  enterGoldMine() {
    //this.mine.kill();
    //this.group.kill();
    this.miner.position.set(550, 200);
    this.layer.destroy();
    this.layer = this.map.createLayer('Gold Mine');
    this.map.setCollisionByExclusion([83,84,85,99,100,101,112,113,128,129,144,145,160,161,115,131,147,148]);
    this.layer.setScale(3);
    this.layer.sendToBack();
    this.layer.resizeWorld();
  }

  attackConfusion() {
    if(!this.miner.attacking) {
      this.blood.visible = false;
      return;
    }
    this.blood.visible = true;
    var bloodAnimation = this.blood.animations.getAnimation('squirt');
    if(!bloodAnimation.isPlaying) {
      this.blood.animations.play('squirt');
    }
  }

  doCollision(a, b) {
    b.collideWith(a);
  }

  update() {
    var speed = 200;
    //this.mine.frame = 0; // reset to "off"

    // TODO
    // this.game.physics.arcade.collide(this.miner, this.loader.collidables, this.doCollision, null, this);
    // this.game.physics.arcade.collide(this.miner, this.layer);

    this.miner.update();

    // this.group.children.each(function(s) {
    //   if(s.active) {
    //     s.update();
    //   }
    // });
    //this.group.sort('y', Phaser.Group.SORT_ASCENDING);
  }

  render () {
    // this.game.debug.body(this.miner);
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
