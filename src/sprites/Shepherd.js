export default class Shepherd {
  get scene() {
    return this._scene;
  }

  get sprite() {
    return this._sprite;
  }

  static preload(scene) {
    var basePath = 'assets/german-shepherd/x3/Shepherd_';

    scene.load.image('shepherd-bark1', `${basePath}bark_1.png`);
    scene.load.image('shepherd-bark2', `${basePath}bark_2.png`);
    scene.load.image('shepherd-bark3', `${basePath}bark_3.png`);

    scene.load.image('shepherd-default', `${basePath}default.png`);

    scene.load.image('shepherd-run1', `${basePath}run_1.png`);
    scene.load.image('shepherd-run2', `${basePath}run_2.png`);
    scene.load.image('shepherd-run3', `${basePath}run_3.png`);
    scene.load.image('shepherd-run4', `${basePath}run_4.png`);
    scene.load.image('shepherd-run5', `${basePath}run_5.png`);

    scene.load.image('shepherd-walk1', `${basePath}walk_1.png`);
    scene.load.image('shepherd-walk2', `${basePath}walk_2.png`);
    scene.load.image('shepherd-walk3', `${basePath}walk_3.png`);
    scene.load.image('shepherd-walk4', `${basePath}walk_4.png`);
    scene.load.image('shepherd-walk5', `${basePath}walk_5.png`);
  }

  constructor(scene, x, y) {
    this._scene = scene;
    window.theScene = scene;
    let animationExists = false;

    animationExists = scene.anims.get('shepherd-walk')

    if(!animationExists) {
      scene.anims.create({
        key: 'shepherd-walk',
        frames: [
            { key: 'shepherd-walk1' },
            { key: 'shepherd-walk2' },
            { key: 'shepherd-walk3' },
            { key: 'shepherd-walk4' },
            { key: 'shepherd-walk5' }
        ],
        frameRate: 8,
        repeat: -1
      });
    }

    animationExists = scene.anims.get('shepherd-run')

    if(!animationExists) {
      scene.anims.create({
        key: 'shepherd-run',
        frames: [
            { key: 'shepherd-run1' },
            { key: 'shepherd-run2' },
            { key: 'shepherd-run3' },
            { key: 'shepherd-run4' },
            { key: 'shepherd-run5' }
        ],
        frameRate: 8,
        repeat: -1
      });
    }

    this._sprite = scene.physics.add.sprite(x, y, 'shepherd-default');

    let animationName = Phaser.Math.RND.pick(['shepherd-walk', 'shepherd-run'])
    this._sprite.play(animationName);
  }
}
