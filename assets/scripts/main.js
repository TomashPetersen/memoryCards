
let scene = new Phaser.Scene("Game");

scene.preload = function() {
  console.log("preload");
};

scene.create = function() {
    console.log("create");
  
}

let config = {
    type: Phaser.AUTO, //webgl or canvas
    width: 1280,
    height: 720,
    scene: scene
};

let game = new Phaser.Game(config);
