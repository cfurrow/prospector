import Phaser from 'phaser'
//import WebFont from 'webfontloader'


export default class extends Phaser.Scene {
  init () {
    //this.fontsReady = false
    //this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    // WebFont.load({
    //   google: {
    //     families: ['Bangers']
    //   },
    //   active: this.fontsLoaded
    // })

    let centerX = this.scene.manager.game.canvas.width / 2;
    let centerY = this.scene.manager.game.canvas.height / 2;
    let text = this.add.text(centerX, centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    //text.anchor.setTo(0.5, 0.5)

    // this.load.image('loaderBg', './assets/images/loader-bg.png')
    //
    // this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  create () {
    this.scene.start('Splash')
  }

  // fontsLoaded () {
  //   this.fontsReady = true
  // }
}
