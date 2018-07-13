import MineEntrance from './sprites/MineEntrance'
import Blocker from './sprites/Blocker'

export default class LevelLoader {
  static get ObjMapper()
  {
    return {
      'MineEntrance' : MineEntrance,
      'Blocker': Blocker,
      'MinerStart' : (game, x, y) => { this.x = x; this.y = y;}
    }
  }

  get scene() {
    return this._scene;
  }

  get map() {
    return this._map;
  }

  get playerStart() {
    return this._playerStart;
  }

  get collidables() {
    return this._collidables;
  }

  constructor(scene) {
    this._scene = scene
    this._playerStart = new Phaser.Geom.Point();
    // parent, name, addToStage, enableBody, physicsBodyType
  }

  loadMap(name) {
    // name, tileWidth, tileHeight, width, height, data, insertNull
    this._map = this.scene.add.tilemap(name);
    this._loadTilesetsFromCache()

    return this._map
  }

  _loadTilesetsFromCache() {
    this.map.tilesets.forEach( (ts) => {
      const name = ts.name
      // tilesetName, key
      this._map.addTilesetImage(name, name, 18, 18);
    })
  }

  loadLayer(name) {
    console.log(`===== loading layer ${name}`)
    const SCALE = 3;
    let map = this.map;
    let tileset = null;
    const scene = this.scene;

    if(this.layer) {
      this.layer.destroy();
    }

    if(this.collidables) {
      this.collidables.destroy();
    }

    tileset = map.tilesets[0];
    this.layer = map.createStaticLayer(name, tileset, 0, 0);
    this.layer.scaleX = this.layer.scaleY = SCALE;

    // TODO: this.layer.resizeWorld();
    // TODO: this._collidables = scene.add.group('collidables', false, true, Phaser.Physics.ARCADE);

    this._loadLayerObjects(name)

    // TODO: this.layer.sendToBack();
    this.layer.depth = 0;
    this.scene.events.emit('onLayerLoaded');
    console.log(`===== layer ${name} loaded!`)

    this.setupPhysics()
  }

  _loadLayerObjects(layerName) {
    console.log(`===== loading layer objects for ${layerName}`)
    const SCALE = 3;
    const map = this.map;
    const game = this.game;

    let objectLayer = map.getObjectLayer(layerName + ' Objects');
    let mapObjInstance = null;
    let properties = {};
    let x, y;

    console.log(`===== found ${objectLayer.objects.length} objects in layer ${layerName}.`)
    console.log(objectLayer.objects)
    for(let obj of objectLayer.objects) {
      properties = obj.properties || {}

      // TODO: get center of obj for placement.
      console.log(`===== Initializing object ${obj.type}.`, obj)

      x = obj.x * SCALE
      y = obj.y * SCALE
      properties.width = obj.width * SCALE
      properties.height = obj.height * SCALE

      if(obj.type === 'MinerStart') {
        this.playerStart.setTo(x, y);
        return;
      } else if (obj.type === 'MineEntrance') {
        mapObjInstance = new MineEntrance(game, x, y, properties);
        mapObjInstance.onTransition.add((newLayerName) => {
          this.loadLayer(newLayerName)
        })
      } else {
        mapObjInstance = new LevelLoader.ObjMapper[obj.type](game, x, y, properties);
      }

      if(mapObjInstance.isCollidable) {
        this.collidables.add(mapObjInstance);
        //console.log("collidables", this.collidables.children)
      } else {
        game.add.existing(mapObjInstance);
      }
    }
  }

  setupPhysics() {
    //TODO: this.collidables.forEach( (c) => c.setupPhysics() )
  }
}
