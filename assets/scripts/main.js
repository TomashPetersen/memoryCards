let config = {
    type: Phaser.AUTO, //webgl or canvas
    width: 1600,
    height: 1200,

    scale: {
        // Or set parent divId here
        // parent: divId,

        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        // Or put game size here
        // width: 1024,
        // height: 768,

        // Minimum size
        min: {
            width: 375,
            height: 375
        },
        // Or set minimum size like these
        // minWidth: 800,
        // minHeight: 600,

        // Maximum size
        max: {
            width: 1980,
            height: 1600
        },
        // Or set maximum size like these
        // maxWidth: 1600,
        // maxHeight: 1200,

        zoom: 1,  // Size of game canvas = game size * zoom
    },
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
            timeout: 30,
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
            timeout: 30,
            addCards: true
        }
    },
    
    scene: [BootScene, PreloadScene, StartScene, GameScene]
};



let game = new Phaser.Game(config);