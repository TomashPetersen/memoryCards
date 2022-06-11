class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('bg', 'assets/sprites/background.jpg');
    }

    create() {
        this.scene.start('Preload');
    }
}