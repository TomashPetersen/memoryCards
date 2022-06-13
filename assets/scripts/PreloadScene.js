class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    preload() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);
        const loadingBar = new LoadingBar(this);
        this.preloadAssets();
    }

    preloadAssets() {
        this.load.image('card', 'assets/sprites/card.png');
        this.load.image('card1', 'assets/sprites/card1.png');
        this.load.image('card2', 'assets/sprites/card2.png');
        this.load.image('card3', 'assets/sprites/card3.png');
        this.load.image('card4', 'assets/sprites/card4.png');
        this.load.image('card5', 'assets/sprites/card5.png');
        this.load.image('card6', 'assets/sprites/card6.png');
        this.load.image('card7', 'assets/sprites/card7.png');
        this.load.image('card8', 'assets/sprites/card8.png');
        this.load.image('card9', 'assets/sprites/card9.png');
        this.load.image('card10', 'assets/sprites/card10.png');
        this.load.image('volume', 'assets/sprites/volume.png');
        this.load.image('mute', 'assets/sprites/mute.png');
        this.load.image('board', 'assets/sprites/board.png');
        this.load.image('levelBoard', 'assets/sprites/levelBoard.png');

        this.load.audio('theme', 'assets/sounds/theme.mp3');
        this.load.audio('complete', 'assets/sounds/complete.mp3');
        this.load.audio('success', 'assets/sounds/success.mp3');
        this.load.audio('card', 'assets/sounds/card.mp3');
        this.load.audio('timeout', 'assets/sounds/timeout.mp3');
    }

    create() {
        this.scene.start('Start');
    }
}