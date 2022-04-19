let config = {
    type: Phaser.AUTO, //webgl or canvas
    width: 1280,
    height: 720,
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
        },
        "3": {
            rows: 2,
            cols: 5,
            cards: [1, 2, 3, 4, 5],
            timeout: 25,
        },
        "4": {
            rows: 4,
            cols: 5,
            cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            timeout: 60,
            addCards: true
        },
        "5": {
            rows: 4,
            cols: 5,
            cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            timeout: 60,
            addCards: true
        }
    },
    scene: [BootScene, PreloadScene, StartScene, GameScene]
};

let game = new Phaser.Game(config);