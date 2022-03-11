
let scene = new Phaser.Scene("Game");

scene.preload = function() {
    //1. Загрузить бэкграунд
  this.load.image('bg', 'assets/sprites/background.png');
};

scene.create = function() {
    //2. Вывести на экран бэкграунд
    // this.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height/2, 'bg');
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
}

let config = {
    type: Phaser.AUTO, //webgl or canvas
    width: 1280,
    height: 720,
    scene: scene
};

let game = new Phaser.Game(config);
