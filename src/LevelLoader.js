import MineEntrance from './sprites/MineEntrance'

export default class LevelLoader {
  static get ObjMapper()
  {
    return {
      'MineEntrance' : MineEntrance,
      'MinerStart' : (game, x, y) => { this.x = x; this.y = y;}
    }
  }

  get game() {
    return this._game;
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

  get onLayerLoaded() {
    return this._onLayerLoaded;
  }

  constructor(game) {
    this._game = game
    this._playerStart = new PIXI.Point();
    this._onLayerLoaded = new Phaser.Signal();
    // parent, name, addToStage, enableBody, physicsBodyType
  }

  loadMap(name) {
    this._map = game.add.tilemap(name);
    this._loadTilesetsFromCache()

    return this._map
  }

  _loadTilesetsFromCache() {
    this.map.tilesets.forEach( (ts) => {
      const name = ts.name
      // tilesetName, key
      this._map.addTilesetImage(name, name);
    })
  }

  loadLayer(name) {
    const SCALE = 3;
    let map = this.map;
    const game = this.game;

    // TODO: destroy current layer objects
    if(this.layer) {
      this.layer.destroy();
    }

    if(this.collidables) {
      this.collidables.destroy();
    }

    this.layer = map.createLayer(name);
    this.layer.setScale(SCALE);
    this.layer.resizeWorld();

    this._collidables = game.add.group(this.game.world, 'collidables', false, true, Phaser.Physics.ARCADE);

    this._loadLayerObjects(name)

    this.layer.sendToBack();
    this.onLayerLoaded.dispatch();
  }

  _loadLayerObjects(layerName) {
    const SCALE = 3;
    const map = this.map;
    const game = this.game;
    let layerObjects = map.objects[layerName + ' Objects'];
    let mapObjInstance = null;

    layerObjects.forEach( (obj, index, array) => {

      console.log(obj.type, obj)

      if(obj.type === 'MinerStart') {
        this.playerStart.set(obj.x*SCALE, obj.y*SCALE);
        return;
      } else if (obj.type === 'MineEntrance') {
        mapObjInstance = new MineEntrance(game, obj.x*SCALE, obj.y*SCALE, obj.properties);
        mapObjInstance.onTransition.add((newLayerName) => {
          this.loadLayer(newLayerName)
        })
      } else {
        mapObjInstance = new LevelLoader.ObjMapper[obj.type](game, obj.x*SCALE, obj.y*SCALE, obj.properties);
      }

      if(mapObjInstance.isCollidable) {
        this.collidables.add(mapObjInstance);
        //console.log("collidables", this.collidables.children)
      } else {
        game.add.existing(mapObjInstance);
      }
    })
  }

  setupPhysics() {
    this.collidables.forEach( (c) => c.setupPhysics() )
  }
}
