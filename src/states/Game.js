/* globals __DEV__ */
import Phaser from 'phaser'
import Miner from '../sprites/Miner'
import Squirrel from '../sprites/Squirrel'
import Blood from '../sprites/Blood'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.miner = new Miner(game, 150, 200);
    this.miner.create();

    this.map = game.add.tilemap('cave');
    this.map.addTilesetImage('cave3', 'cave');

    this.layer = this.map.createLayer('Overworld');
    this.layer.setScale(3);
    this.layer.resizeWorld();

    this.group = game.add.group();
    this.group.addChild(this.miner);

    for(var i=0; i < 500; i++) {
      this.group.addChild(Squirrel.createAtRandom(this.game));
    }
    this.group.sort();

    this.mine = this.game.add.sprite(500, 400, 'mine', 0);
    this.mine.anchor.set(0.5,0.5);
    this.mine.scale.set(2,2);
    this.mine.smoothed = false;

    this.blood = new Blood(game, 1, 1)

    // this.confusion = this.game.add.sprite(50, 550, 'confusion');
    // this.confusion.anchor.set(0.5, 0.5);
    // this.confusion.scale.set(0.3, 0.3);
    // this.confusion.addChild(this.blood);

    // var confusionTween = this.game.add.tween(this.confusion);
    // confusionTween.to({x: 750}, 5500, Phaser.Easing.Elastic.InOut, true, 0, -1, true);

    this.game.physics.arcade.enable([this.mine]);

    this.miner.body.collideWorldBounds = true;
    this.miner.body.allowDrag = true;
    this.miner.body.setSize(72 / this.miner.scale.x, 72 / this.miner.scale.y, 72 / this.miner.scale.x, 72 / this.miner.scale.y);

    this.mine.body.immovable = true;
    this.mine.body.setSize(40, 40, 16, 48);

    this.game.camera.follow(this.miner);
    this.exitGoldMine.call(this);
  }

  mineSomeGold() {
    this.mine.frame = 1;
    this.enterGoldMine.call(this);
  }

  enterGoldMine() {
    this.mine.kill();
    //this.group.kill();
    this.miner.position.set(550, 200);
    this.layer.destroy();
    this.layer = this.map.createLayer('Gold Mine');
    this.map.setCollisionByExclusion([83,84,85,99,100,101,112,113,128,129,144,145,160,161,115,131,147,148]);
    this.layer.setScale(3);
    this.layer.sendToBack();
    this.layer.resizeWorld();
  }

  exitGoldMine() {
    //this.mine bring back to life
    this.layer.destroy();
    this.layer = this.map.createLayer('Overworld');
    this.layer.scale.set(3);
    this.layer.sendToBack();
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

  update() {
    var speed = 200;
    //this.mine.frame = 0; // reset to "off"

    this.game.physics.arcade.collide(this.miner, this.mine, this.mineSomeGold, null, this);
    this.game.physics.arcade.collide(this.miner, this.layer);

    this.miner.update();

    this.group.forEachAlive(function(s){ s.update(); });
    this.group.sort('y', Phaser.Group.SORT_ASCENDING);
  }

  render () {
    //this.game.debug.body(this.miner);
    // this.game.debug.body(this.mine);
    //this.game.debug.body(this.axHitbox);
    //this.layer.debug = true;
  }
}
