let config = {
    type: Phaser.AUTO, //webgl or canvas
    width: 1280,
    height: 720,
    numberOfLevel: 2,
    levelCount: 1,
    levels: {
        "1": {
            rows: 2,
            cols: 5,
            cards: [1, 2, 3, 4, 5],
            timeout: 60,
        },
        "2": {
            rows: 2,
            cols: 5,
            cards: [1, 2, 3, 4, 5],
            timeout: 40,
        }
    },
    scene: [BootScene, PreloadScene, StartScene, GameScene]
};

let game = new Phaser.Game(config);