class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    create() {
        this.createBackground();
        this.createText();
        this.setEvents();
    }

    createText() {
        this.timeoutText = this.add.text(config.width / 2, 200, "Tap on screen to start", {
            font: `40px ComicHelvetic`,
            fill: '#ffffff'
        }).setOrigin(0.5);
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }

    setEvents() {
        this.input.on("pointerdown", () => {
            this.scene.start('Game');
        })
    }
}