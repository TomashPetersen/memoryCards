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
        this.timeoutText = this.add.text(config.width / 2, 200, "Click on screen to start", {
            font: `60px PirateOfTheSeaside`,
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